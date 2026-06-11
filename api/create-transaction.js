// api/create-transaction.js
// Vercel Serverless Function: Membuat transaksi baru di Midtrans

const https = require('https');

module.exports = async (req, res) => {
    // Izinkan CORS agar frontend bisa memanggil API ini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { order_id, gross_amount, customer, items } = req.body;

        if (!order_id || !gross_amount || !customer || !items) {
            return res.status(400).json({ error: 'Parameter tidak lengkap' });
        }

        // Server Key Midtrans (diambil dari environment variable)
        const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-JgT4R99gP7v-C_N2r1t7qNqA'; // Fallback Sandbox Key default jika belum diatur
        const encoded = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');

        // Data transaksi yang dikirim ke Midtrans Snap
        const transactionData = {
            transaction_details: {
                order_id: order_id,
                gross_amount: Number(gross_amount)
            },
            customer_details: {
                first_name: customer.firstName,
                last_name: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                billing_address: {
                    first_name: customer.firstName,
                    last_name: customer.lastName,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city
                },
                shipping_address: {
                    first_name: customer.firstName,
                    last_name: customer.lastName,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city
                }
            },
            item_details: items.map(item => ({
                id: String(item.id),
                price: Number(item.price),
                quantity: 1,
                name: item.title.substring(0, 50) // Batasi nama produk maks 50 karakter untuk Midtrans
            }))
        };

        // Kirim request ke API Midtrans Sandbox
        const midtransResponse = await makeRequest({
            hostname: 'app.sandbox.midtrans.com',
            path: '/snap/v1/transactions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encoded}`
            },
            body: JSON.stringify(transactionData)
        });

        const result = JSON.parse(midtransResponse);

        if (result.token) {
            return res.status(200).json({
                snap_token: result.token,
                redirect_url: result.redirect_url,
                order_id: order_id
            });
        } else {
            console.error('Midtrans error:', result);
            return res.status(400).json({ error: 'Gagal membuat transaksi', detail: result });
        }

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

// Helper function untuk HTTP request
function makeRequest(options) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => resolve(data));
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}
