import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' })

  const adminPassword = req.headers['x-admin-password']
  if (adminPassword !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })

  const { order_id, status } = req.body

  if (!order_id || !status) {
    return res.status(400).json({ error: 'order_id dan status wajib diisi' })
  }

  try {
    // Ambil status order saat ini dulu, sebelum diupdate.
    // Ini penting supaya stok hanya dikurangi SEKALI saat pertama kali
    // ditandai 'paid' -- kalau diklik berulang, tidak dikurangi lagi.
    const { data: existingOrder, error: fetchOrderError } = await supabase
      .from('orders')
      .select('status, items')
      .eq('order_id', order_id)
      .single()

    if (fetchOrderError) throw fetchOrderError

    const wasAlreadyPaid = existingOrder?.status === 'paid'

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_id', order_id)

    if (error) throw error

    // Kurangi stok produk HANYA kalau status baru diubah jadi 'paid'
    // dan sebelumnya belum 'paid' (mencegah stok terpotong dua kali).
    if (status === 'paid' && !wasAlreadyPaid) {
      try {
        const items = existingOrder?.items || []
        const qtyPerProduct = {}

        for (const item of items) {
          const id = item.id
          if (!id) continue
          qtyPerProduct[id] = (qtyPerProduct[id] || 0) + 1
        }

        const productIds = Object.keys(qtyPerProduct)

        if (productIds.length > 0) {
          const { data: productsData, error: fetchProductsError } = await supabase
            .from('products')
            .select('id, stok')
            .in('id', productIds)

          if (fetchProductsError) throw fetchProductsError

          for (const product of productsData || []) {
            const orderedQty = qtyPerProduct[product.id] || 0
            const currentStock = Number(product.stok)

            // Kalau kolom stok belum diisi (null/undefined), lewati produk ini
            if (Number.isNaN(currentStock)) continue

            const newStock = Math.max(0, currentStock - orderedQty)

            const { error: updateStokError } = await supabase
              .from('products')
              .update({ stok: newStock })
              .eq('id', product.id)

            if (updateStokError) {
              console.error(`Gagal update stok produk ${product.id}:`, updateStokError.message)
            }
          }
        }
      } catch (stockError) {
        // Tidak melempar error ke admin kalau bagian ini gagal,
        // karena status pesanan sudah berhasil terupdate duluan.
        console.error('Gagal mengurangi stok:', stockError.message)
      }
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}