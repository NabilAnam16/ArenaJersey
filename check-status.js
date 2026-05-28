// api/check-status.js
// Vercel Serverless Function: Mengecek status pembayaran dari Midtrans

const https = require('https');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { order_id } = req.query;

    if (!order_id) {
        return res.status(400).json({ error: 'order_id diperlukan' });
    }

    try {
        const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'ISI_SERVER_KEY_MIDTRANS_KAMU_DISINI';
        const encoded = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');

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
        const isPending = result.transaction_status === 'pending';
        const isFailed = result.transaction_status === 'deny' || 
                         result.transaction_status === 'cancel' || 
                         result.transaction_status === 'expire';

        return res.status(200).json({
            order_id: order_id,
            status: result.transaction_status,
            isPaid,
            isPending,
            isFailed,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

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
