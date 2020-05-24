import express from 'express'
import multer from 'multer'
import path from 'path';
import fs from 'fs';

import ProductsApi from '../apis/productsApi.js';

const router = express.Router()

const api = new ProductsApi()

const uploadPath = path.join(path.resolve(), '/src/server/uploads/')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('image'), async (req, res) => {
    const newProduct = req.body
    try {
        if (req.file) {
            newProduct.imageName = req.file.filename
        }
        const product = await api.add(newProduct)
        res.status(201).json(product)
    } catch (e) {
        res.status(e.status).json(e)
    }
})

export default router