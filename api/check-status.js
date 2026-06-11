// api/check-status.js
// Vercel Serverless Function: Mengecek status pembayaran dari Midtrans

const https = require('https');

module.exports = async (req, res) => {
    // Izinkan CORS agar frontend bisa memanggil API ini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { order_id } = req.query;

    if (!order_id) {
        return res.status(400).json({ error: 'order_id diperlukan' });
    }

    try {
        // Server Key Midtrans
        const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-JgT4R99gP7v-C_N2r1t7qNqA';
        const encoded = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');

        // Panggil status API Midtrans Sandbox
        const response = await makeRequest({
            hostname: 'api.sandbox.midtrans.com',
            path: `/v2/${order_id}/status`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        });

        const result = JSON.parse(response);

        // Status dari Midtrans: settlement/capture = LUNAS, pending = MENUNGGU, dll
        const isPaid = result.transaction_status === 'settlement' || 
                       result.transaction_status === 'capture';

        return res.status(200).json({
            order_id: order_id,
            status: result.transaction_status,
            isPaid: isPaid,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount,
            raw: result
        });

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
        req.end();
    });
}
