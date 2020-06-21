import express from 'express'
import PurchasesApi from '../apis/purchasesApi.js'

function getPurchasesRouter(){
    const router = express.Router()

    const purchasesApi = new PurchasesApi()

    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const purchases = await purchasesApi.get(queryParams)
            res.json(purchases)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.post('/', async (req, res) => {
        const purchase = req.body

        try {
            const newPurchase = await purchasesApi.add(purchase)
            res.status(201).json(newPurchase)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.put('/:id', async (req, res) => {
        const purchase = req.body

        try {
            const updatedPurchase = await purchasesApi.update(req.params.id, purchase)
            res.json(updatedPurchase)
        } catch (error) {
            res.status(error.status).json(err)
        }
    })

    return router
}

export { getPurchasesRouter }