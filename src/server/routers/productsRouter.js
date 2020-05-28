import express from 'express'

import ProductsApi from '../apis/productsApi.js';
import { createUploader, getAllFiles } from '../helpers/FileHelper.js';

import config from '../../../config.js'

const router = express.Router()

const api = new ProductsApi()

const uploader = createUploader(config.absoluteImageDir)

router.post('/', uploader.single('image'), async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const files = await getAllFiles(config.absoluteImageDir)
        const dir = req.protocol + "://" + req.headers.host + config.publicImageDir + "/"
        const results = []
        files.forEach(file => {
            results.push(dir + file)
        })
        res.status(200).json(results)
    } catch (e) {
        res.status(501).json(e.message)
    }
})

export default router