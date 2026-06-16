import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const adminPassword = req.headers['x-admin-password']
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id, title, price, description, kondisi, sizes, stok } = req.body

    try {
        const { data, error } = await supabase
            .from('products')
            .update({ title, price, description, kondisi, sizes, stok })
            .eq('id', id)
            .select()

        if (error) throw error

        return res.status(200).json({ success: true, product: data[0] })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}