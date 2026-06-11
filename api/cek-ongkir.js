export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PROVINSI_JAWA = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah',
    'Jawa Timur', 'DI Yogyakarta', 'Banten'
  ];

  const { provinsi, kota_id, jumlah_item } = req.body;
  const berat = 300 * (jumlah_item || 1);

  if (PROVINSI_JAWA.includes(provinsi)) {
    return res.status(200).json({ 
      ongkir: 0, 
      gratis: true, 
      estimasi: '1-2 hari' 
    });
  }

  try {
    const response = await fetch('https://api.rajaongkir.com/starter/cost', {
      method: 'POST',
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY,
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: `origin=444&destination=${kota_id}&weight=${berat}&courier=jnt`
    });

    const data = await response.json();
    const hasil = data.rajaongkir.results[0].costs[0];

    return res.status(200).json({
      ongkir: hasil.cost[0].value,
      gratis: false,
      estimasi: hasil.cost[0].etd + ' hari'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengambil data ongkir' });
  }
}