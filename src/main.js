import Server from './server/app.js'

const server = new Server()

const PORT = process.env.PORT

server.setOnReady(async (port) => {
    // eslint-disable-next-line no-console
    console.log(`listening on port: ${port}`)
})

server.start(PORT)
