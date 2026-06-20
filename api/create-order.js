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

    return res.status(200).json({ success: true, order_id })

  } catch (error) {
    console.error('Create order error:', error)
    return res.status(500).json({ error: error.message })
  }
}
