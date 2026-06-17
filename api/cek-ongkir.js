<<<<<<< HEAD
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provinsi, jumlah_item } = req.body;
  const jumlah = jumlah_item || 1;

  const PROVINSI_JAWA = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah',
    'Jawa Timur', 'DI Yogyakarta', 'Banten'
  ];

  const TARIF = {
    'Sumatera': 25000,
    'Kalimantan': 35000,
    'Sulawesi': 35000,
    'Bali & Nusa Tenggara': 30000,
    'Maluku & Papua': 50000
  };

  const getWilayah = (prov) => {
    const sumatera = ['Aceh','Sumatera Utara','Sumatera Barat','Riau','Kepulauan Riau','Jambi','Sumatera Selatan','Bangka Belitung','Bengkulu','Lampung'];
    const kalimantan = ['Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara'];
    const sulawesi = ['Sulawesi Utara','Sulawesi Tengah','Sulawesi Selatan','Sulawesi Tenggara','Gorontalo','Sulawesi Barat'];
    const baliNTT = ['Bali','Nusa Tenggara Barat','Nusa Tenggara Timur'];
    const malukuPapua = ['Maluku','Maluku Utara','Papua','Papua Barat'];

    if (sumatera.includes(prov)) return 'Sumatera';
    if (kalimantan.includes(prov)) return 'Kalimantan';
    if (sulawesi.includes(prov)) return 'Sulawesi';
    if (baliNTT.includes(prov)) return 'Bali & Nusa Tenggara';
    if (malukuPapua.includes(prov)) return 'Maluku & Papua';
    return null;
  };

  if (PROVINSI_JAWA.includes(provinsi)) {
    return res.status(200).json({ 
      ongkir: 0, 
      gratis: true, 
      estimasi: '1-2 hari' 
    });
  }

  const wilayah = getWilayah(provinsi);
  if (!wilayah) {
    return res.status(400).json({ error: 'Provinsi tidak ditemukan' });
  }

  const ongkirPerItem = TARIF[wilayah];
  const totalOngkir = ongkirPerItem * jumlah;

  const estimasi = {
    'Sumatera': '2-3 hari',
    'Kalimantan': '3-4 hari',
    'Sulawesi': '3-4 hari',
    'Bali & Nusa Tenggara': '2-3 hari',
    'Maluku & Papua': '5-7 hari'
  };

  return res.status(200).json({
    ongkir: totalOngkir,
    gratis: false,
    estimasi: estimasi[wilayah]
  });
=======
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provinsi, jumlah_item } = req.body;
  const jumlah = jumlah_item || 1;

  const PROVINSI_JAWA = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah',
    'Jawa Timur', 'DI Yogyakarta', 'Banten'
  ];

  const TARIF = {
    'Sumatera': 25000,
    'Kalimantan': 35000,
    'Sulawesi': 35000,
    'Bali & Nusa Tenggara': 30000,
    'Maluku & Papua': 50000
  };

  const getWilayah = (prov) => {
    const sumatera = ['Aceh','Sumatera Utara','Sumatera Barat','Riau','Kepulauan Riau','Jambi','Sumatera Selatan','Bangka Belitung','Bengkulu','Lampung'];
    const kalimantan = ['Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara'];
    const sulawesi = ['Sulawesi Utara','Sulawesi Tengah','Sulawesi Selatan','Sulawesi Tenggara','Gorontalo','Sulawesi Barat'];
    const baliNTT = ['Bali','Nusa Tenggara Barat','Nusa Tenggara Timur'];
    const malukuPapua = ['Maluku','Maluku Utara','Papua','Papua Barat'];

    if (sumatera.includes(prov)) return 'Sumatera';
    if (kalimantan.includes(prov)) return 'Kalimantan';
    if (sulawesi.includes(prov)) return 'Sulawesi';
    if (baliNTT.includes(prov)) return 'Bali & Nusa Tenggara';
    if (malukuPapua.includes(prov)) return 'Maluku & Papua';
    return null;
  };

  if (PROVINSI_JAWA.includes(provinsi)) {
    return res.status(200).json({ 
      ongkir: 0, 
      gratis: true, 
      estimasi: '1-2 hari' 
    });
  }

  const wilayah = getWilayah(provinsi);
  if (!wilayah) {
    return res.status(400).json({ error: 'Provinsi tidak ditemukan' });
  }

  const ongkirPerItem = TARIF[wilayah];
  const totalOngkir = ongkirPerItem * jumlah;

  const estimasi = {
    'Sumatera': '2-3 hari',
    'Kalimantan': '3-4 hari',
    'Sulawesi': '3-4 hari',
    'Bali & Nusa Tenggara': '2-3 hari',
    'Maluku & Papua': '5-7 hari'
  };

  return res.status(200).json({
    ongkir: totalOngkir,
    gratis: false,
    estimasi: estimasi[wilayah]
  });
>>>>>>> cf2231ea312c3dc94894637a35a3a44fc13a12ed
}