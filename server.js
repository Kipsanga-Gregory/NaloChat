const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'Public')))

io.on('connection',(socket)=>{
    console.log("Nigga Ventured")
    socket.emit('message', "Welcome Ninja!")

    socket.broadcast.emit('message', "User X Connected")

    socket.on('disconnect',()=>{
        io.emit('message', "Some Bitch Left")
    })

    socket.on('chatMessage', (message) => {
        io.emit('newChat',message)
    })
})


const PORT = process.env.PORT || 3000 

app.get('/', (req, res)=>{
    res.send("Hello")
})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})