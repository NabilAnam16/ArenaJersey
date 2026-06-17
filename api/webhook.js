const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const notification = req.body;

    // Verifikasi signature
    const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    const signaturePayload = notification.order_id + notification.status_code + notification.gross_amount + MIDTRANS_SERVER_KEY;
    const calculatedSignature = crypto.createHash('sha512').update(signaturePayload).digest('hex');

    if (calculatedSignature !== notification.signature_key) {
      console.error('Invalid signature key!');
      return res.status(401).json({ error: 'Invalid signature key' });
    }

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(`Webhook: Order ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

    // Cek apakah pembayaran berhasil
    const isPaid = (transactionStatus === 'capture' && fraudStatus === 'accept') ||
                   transactionStatus === 'settlement';

    if (isPaid) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

      // Cek apakah order sudah ada
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('order_id', orderId)
        .single();

      if (existingOrder) {
        // Update status jadi paid
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('order_id', orderId);
      } else {
        // Buat order baru
        await supabase
          .from('orders')
          .insert([{
            order_id: orderId,
            customer_name: notification.customer_details?.first_name + ' ' + (notification.customer_details?.last_name || ''),
            customer_email: notification.customer_details?.email || '',
            customer_phone: notification.customer_details?.phone || '',
            total: parseInt(notification.gross_amount),
            status: 'paid',
            status_pengiriman: 'pending'
          }]);
      }

      console.log(`Order ${orderId} berhasil disimpan ke Supabase!`);
    }

    return res.status(200).json({ status: 'OK', message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};