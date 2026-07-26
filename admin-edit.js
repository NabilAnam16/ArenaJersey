import { createClient } from '@supabase/supabase-js'
import multiparty from 'multiparty'
import fs from 'fs'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const adminPassword = req.headers['x-admin-password']
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const form = new multiparty.Form()

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: err.message })

        try {
            const id = fields.id?.[0]
            if (!id) return res.status(400).json({ error: 'Product id wajib diisi' })

            const updateData = {
                title: fields.title?.[0],
                price: fields.price?.[0] ? parseInt(fields.price[0]) : undefined,
                description: fields.description?.[0],
                kondisi: fields.kondisi?.[0],
                stok: fields.stok?.[0] ? parseInt(fields.stok[0]) : undefined,
                sizes: fields.sizes?.[0]
                    ? fields.sizes[0].split(',').map(s => s.trim()).filter(Boolean)
                    : undefined
            }

            // keepImages dikirim = frontend ingin update foto juga (foto lama yang dipertahankan)
            const keepImages = fields.keepImages?.[0] ? JSON.parse(fields.keepImages[0]) : null

            if (keepImages !== null) {
                const newImageUrls = []
                const imageFiles = files.images || []

                for (const file of imageFiles) {
                    const fileBuffer = fs.readFileSync(file.path)
                    const fileName = `${Date.now()}-${file.originalFilename}`

                    const { error: uploadError } = await supabase.storage
                        .from('product-images')
                        .upload(fileName, fileBuffer, {
                            contentType: file.headers['content-type']
                        })

                    if (uploadError) throw uploadError

                    const { data: urlData } = supabase.storage
                        .from('product-images')
                        .getPublicUrl(fileName)

                    newImageUrls.push(urlData.publicUrl)
                }

                const finalImages = [...keepImages, ...newImageUrls]
                if (finalImages.length === 0) {
                    return res.status(400).json({ error: 'Produk harus punya minimal 1 foto' })
                }
                updateData.images = finalImages
            }

            const { data, error } = await supabase
                .from('products')
                .update(updateData)
                .eq('id', id)
                .select()

            if (error) throw error

            return res.status(200).json({ success: true, product: data[0] })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
}sss