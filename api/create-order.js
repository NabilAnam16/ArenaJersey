import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { order_id, customer, items, total } = req.body

    if (!order_id || !customer || !items || !total) {
      return res.status(400).json({ error: 'Parameter tidak lengkap' })
    }

    const { error } = await supabase
      .from('orders')
      .insert([{
        order_id,
        customer_name: `${customer.firstName} ${customer.lastName || ''}`.trim(),
        customer_email: customer.email || '',
        customer_phone: customer.phone || '',
        customer_address: customer.address || '',
        items: items,
        total: Number(total),
        status: 'pending',
        status_pengiriman: 'pending'
      }])

    if (error) throw error

    // Kurangi stok produk sesuai jumlah yang dipesan.
    // Tidak melempar error ke customer kalau bagian ini gagal,
    // karena pesanan sudah berhasil tercatat duluan.
    try {
      const qtyPerProduct = {}
      for (const item of items) {
        const id = item.id
        if (!id) continue
        qtyPerProduct[id] = (qtyPerProduct[id] || 0) + 1
      }

      const productIds = Object.keys(qtyPerProduct)

      if (productIds.length > 0) {
        const { data: productsData, error: fetchError } = await supabase
          .from('products')
          .select('id, stok')
          .in('id', productIds)

        if (fetchError) throw fetchError

        for (const product of productsData || []) {
          const orderedQty = qtyPerProduct[product.id] || 0
          const currentStock = Number(product.stok)

          // Kalau kolom stok belum diisi (null/undefined), lewati produk ini
          if (Number.isNaN(currentStock)) continue

          const newStock = Math.max(0, currentStock - orderedQty)

          const { error: updateError } = await supabase
            .from('products')
            .update({ stok: newStock })
            .eq('id', product.id)

          if (updateError) {
            console.error(`Gagal update stok produk ${product.id}:`, updateError.message)
          }
        }
      }
    } catch (stockError) {
      console.error('Gagal mengurangi stok:', stockError.message)
    }

    return res.status(200).json({ success: true, order_id })

  } catch (error) {
    console.error('Create order error:', error)
    return res.status(500).json({ error: error.message })
  }
}