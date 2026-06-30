import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Normalisasi nomor HP: hilangkan spasi, strip, tanda kurung,
// dan samakan awalan 08xxx / +628xxx / 628xxx jadi format yang sama.
const normalizePhone = (phone) => {
  if (!phone) return ''
  let cleaned = phone.replace(/[\s\-()]/g, '')
  if (cleaned.startsWith('+62')) cleaned = '0' + cleaned.slice(3)
  else if (cleaned.startsWith('62')) cleaned = '0' + cleaned.slice(2)
  return cleaned
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { phone } = req.query
  if (!phone) return res.status(400).json({ error: 'Nomor HP diperlukan' })

  const targetPhone = normalizePhone(phone)

  if (targetPhone.length < 8) {
    return res.status(400).json({ error: 'Nomor HP tidak valid' })
  }

  try {
    // Ambil semua order, lalu cocokkan nomor HP setelah dinormalisasi.
    // (Supabase tidak bisa normalize di level query, jadi dicocokkan di sini.)
    const { data, error } = await supabase
      .from('orders')
      .select('order_id, customer_phone, status, status_pengiriman, total, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    const matched = (data || [])
      .filter(order => normalizePhone(order.customer_phone) === targetPhone)
      .map(order => ({
        order_id: order.order_id,
        status: order.status,
        status_pengiriman: order.status_pengiriman,
        total: order.total,
        created_at: order.created_at
      }))

    if (matched.length === 0) {
      return res.status(404).json({ error: 'Tidak ada pesanan ditemukan untuk nomor HP ini' })
    }

    return res.status(200).json({ orders: matched })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}