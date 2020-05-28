import express from 'express'
import bodyParser from 'body-parser'


import productsRouter from './routers/productsRouter.js'
import config from '../../config.js'


class App {

    constructor() {
        const app = express()
        app.use(express.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(config.publicImageDir, express.static(config.absoluteImageDir));
        app.set('json spaces', 4)
        app.use('/api/products', productsRouter)
        this.app = app
    }

    addTestRouter(path, router) {
        this.app.use(path, router)
    }

    setOnReady(cb) {
        this.app.on('app_ready', cb)
    }

    start(port) {
        if (!port) {
            port = 0
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }
}

export default App
