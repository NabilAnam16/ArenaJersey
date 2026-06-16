import { createClient } from '@supabase/supabase-js'
import multiparty from 'multiparty'
import fs from 'fs'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    // Cek password admin
    const adminPassword = req.headers['x-admin-password']
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const form = new multiparty.Form()

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: err.message })

        try {
            const title = fields.title[0]
            const price = parseInt(fields.price[0])
            const description = fields.description[0]
            const kondisi = fields.kondisi[0]
            const sizes = fields.sizes[0].split(',').map(s => s.trim())
            const stok = parseInt(fields.stok[0]) || 1

            // Upload foto-foto
            const imageUrls = []
            const imageFiles = files.images || []

            for (const file of imageFiles) {
                const fileBuffer = fs.readFileSync(file.path)
                const fileName = `${Date.now()}-${file.originalFilename}`

                const { data, error } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, fileBuffer, {
                        contentType: file.headers['content-type']
                    })

                if (error) throw error

                const { data: urlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName)

                imageUrls.push(urlData.publicUrl)
            }

            // Simpan produk ke database
            const { data, error } = await supabase
                .from('products')
                .insert([{
                    title,
                    price,
                    description,
                    kondisi,
                    sizes,
                    images: imageUrls,
                    stok
                }])
                .select()

            if (error) throw error

            return res.status(200).json({ success: true, product: data[0] })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
}