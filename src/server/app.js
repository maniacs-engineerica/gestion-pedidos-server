import express from 'express'
import { getPurchasesRouter } from './routers/purchasesRouter.js'

class App {
    constructor() {
        const app = express()
        app.use(express.json())
        app.use('/api/purchases', getPurchasesRouter())
        this.app = app
    }
}

export default App
