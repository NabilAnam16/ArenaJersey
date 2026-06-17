import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  const { order_id } = req.query
  if (!order_id) return res.status(400).json({ error: 'Order ID diperlukan' })

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('order_id, customer_name, status, resi, kurir, status_pengiriman, total, created_at')
      .eq('order_id', order_id)
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: 'Pesanan tidak ditemukan' })

    return res.status(200).json({ order: data })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}