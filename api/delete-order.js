const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const adminPassword = req.headers['x-admin-password'];
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const { order_id } = req.query;

    if (!order_id) {
        return res.status(400).json({ success: false, error: 'order_id wajib diisi' });
    }

    try {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('order_id', order_id);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};