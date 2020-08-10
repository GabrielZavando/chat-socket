
const express = require('express')
const socketIO = require('socket.io')
// servidor de node
const http = require('http')
const path = require('path')

// Ejecutamos servidor de express
const app = express()
// creamos servidor con modulo nativo de node http
const server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

// inicializamos el socketIO, le pasamos el servidor y lo exportamos
// En este punto se establece la comunicacion del backend
module.exports.io = socketIO(server)
// Importamos el archivo socket
require('./sockets/socket')



server.listen(port, (err) => {
  if (err) throw new Error(err)

  console.log(`Servidor corriendo en el puerto ${port}`)
})