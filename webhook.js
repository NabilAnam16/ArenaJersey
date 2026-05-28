// api/webhook.js
// Vercel Serverless Function: Menerima notifikasi otomatis dari Midtrans saat pembayaran berhasil

const crypto = require('crypto');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'ISI_SERVER_KEY_MIDTRANS_KAMU_DISINI';
        const notif = req.body;

        // 1. Verifikasi Signature Key (keamanan agar tidak bisa dipalsukan)
        const orderId = notif.order_id;
        const statusCode = notif.status_code;
        const grossAmount = notif.gross_amount;
        const serverKey = MIDTRANS_SERVER_KEY;

        const rawString = orderId + statusCode + grossAmount + serverKey;
        const expectedSignature = crypto.createHash('sha512').update(rawString).digest('hex');

        if (notif.signature_key !== expectedSignature) {
            console.error('Signature tidak valid! Kemungkinan data palsu.');
            return res.status(403).json({ error: 'Invalid signature' });
        }

        // 2. Cek status transaksi
        const transactionStatus = notif.transaction_status;
        const fraudStatus = notif.fraud_status;

        console.log(`Order ID: ${orderId} | Status: ${transactionStatus} | Fraud: ${fraudStatus}`);

        if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
            // ✅ PEMBAYARAN BERHASIL
            if (fraudStatus === 'accept' || transactionStatus === 'settlement') {
                console.log(`✅ Pembayaran LUNAS untuk Order: ${orderId}`);
                // Jika pakai database, UPDATE status di sini
                // Contoh: db.orders.update({ order_id: orderId }, { status: 'PAID' })
            }
        } else if (transactionStatus === 'pending') {
            console.log(`⏳ Menunggu pembayaran untuk Order: ${orderId}`);
        } else if (['deny', 'expire', 'cancel'].includes(transactionStatus)) {
            console.log(`❌ Pembayaran GAGAL/EXPIRED untuk Order: ${orderId}`);
        }

        // 3. Wajib kirim respon 200 ke Midtrans
        return res.status(200).json({ 
            status: 'OK', 
            order_id: orderId,
            transaction_status: transactionStatus 
        });

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: error.message });
    }
};
