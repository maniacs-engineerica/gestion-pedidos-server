import express from 'express'
import ProductsApi from '../apis/productsApi.js'

function getProductsRouter() {
    const router = express.Router()

    const productsApi = new ProductsApi()

    router.put('/:id', async (req, res) => {
        const product = req.body

        try {
            const updatedProduct = await productsApi.update(product)
            res.json(updatedProduct)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    
    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const purchases = await purchasesApi.get(queryParams)
            res.json(purchases)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    return router
}

export { getProductsRouter }
