// api/webhook.js
// Vercel Serverless Function: Menerima notifikasi webhook dari Midtrans

const crypto = require('crypto');

module.exports = async (req, res) => {
    // Izinkan CORS agar Midtrans bisa memanggil API ini
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
        const notification = req.body;
        
        // Verifikasi signature key dari Midtrans demi keamanan
        const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-JgT4R99gP7v-C_N2r1t7qNqA';
        const signaturePayload = notification.order_id + notification.status_code + notification.gross_amount + MIDTRANS_SERVER_KEY;
        const calculatedSignature = crypto.createHash('sha512').update(signaturePayload).digest('hex');

        if (calculatedSignature !== notification.signature_key) {
            console.error('Invalid signature key from webhook request!');
            return res.status(401).json({ error: 'Invalid signature key' });
        }

        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const fraudStatus = notification.fraud_status;

        console.log(`Received webhook for Order ID ${orderId}. Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

        // Di sini Anda bisa menambahkan logika tambahan seperti mengirim email notifikasi ke admin atau mencatat ke database.
        
        return res.status(200).json({ status: 'OK', message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
