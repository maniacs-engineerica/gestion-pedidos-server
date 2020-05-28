import express from 'express'
import Server from "../src/server/app.js";
import path from 'path';

const server = new Server()

const router = express.Router()

router.get('/product', async (req, res) => {
  res.sendFile(path.resolve() + "/test/product.htm")
})

server.addTestRouter('/test', router)

const PORT = process.env.PORT || 5000

server.setOnReady(async (port) => {
    // eslint-disable-next-line no-console
    console.log(`listening on port: ${port}`)
})

server.start(PORT)