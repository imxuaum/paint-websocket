const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const port = 3333

const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + "/public"))

const io = socketIo.listen(server)

server.listen(port, () => {
    console.log(`[*] Server is running at port: ${port}`)
    console.log(`[*] Server is running at: http://localhost:${port}`)
})

const history = []

io.on('connection', (socket) => {
    console.log('New conneciton')

    history.forEach(line => {
        socket.emit('draw', line)
    })

    socket.on('draw', (line) => {
        history.push(line)
        io.emit('draw', line)
    })
})

