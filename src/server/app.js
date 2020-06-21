import express from 'express'
import { getPurchasesRouter } from './routers/purchasesRouter.js'
import { getProductsRouter } from './routers/productsRouter.js'

class App {
    constructor() {
        const app = express()
        app.use(express.json())
        app.use('/api/purchases', getPurchasesRouter())
        app.use('/api/products', getProductsRouter())
        this.app = app
    }
}

export default App
