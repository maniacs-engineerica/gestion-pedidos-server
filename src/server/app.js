import express from 'express'
import { getPurchasesRouter } from './routers/purchasesRouter.js'
import { getProductsRouter } from './routers/productsRouter.js'
import { getSuggestionsRouter } from './routers/suggestionsRouters.js'

class App {
    constructor() {
        const app = express()
        app.use(express.json())
        app.use('/api/purchases', getPurchasesRouter())
        app.use('/api/products', getProductsRouter())
        app.use('/api/suggestions', getSuggestionsRouter())       
        this.app = app
    }
}

export default App
