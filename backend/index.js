import express from "express"
import cors from "cors"
import {Server} from "socket.io"
import http from "http"

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket) => {
    console.log(`el usuario ${socket.id} se ha conectado`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`el usuario ${socket.id} se ha unido a la sala: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log(`el usuario ${socket.id} se ha desconectado`)
    })

})

server.listen(3001, () => {
    console.log(`server corriendo en el puerto 3001`)
})
