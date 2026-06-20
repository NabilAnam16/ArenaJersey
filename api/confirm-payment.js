import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' })

  const adminPassword = req.headers['x-admin-password']
  if (adminPassword !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const { order_id } = req.body
    if (!order_id) return res.status(400).json({ error: 'order_id diperlukan' })

    const { error } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('order_id', order_id)

    if (error) throw error

    return res.status(200).json({ success: true })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
