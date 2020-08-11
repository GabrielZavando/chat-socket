
// Importamos la variable io
const {io} = require('../server')
// importamos clase Usuarios
const {Usuarios} = require('../classes/usuarios')
const {crearMensaje} = require('../utilidades/utilidades')

// creamos un array de usuarios
const usuarios = new Usuarios()


// Para capturar las conecciones que se establecen desde el frontend
io.on('connection', (client) =>{
  // client nos trae toda la información de la computador, de la coneccion que se establecio y del usuario que la estableció
  console.log('Usuario conectado')

  // escucho a los usuarios que se conectan
  client.on('entrarChat', (user, callback) => {
    // Si el user no trae nombre ni sala
    if(!user.nombre || !user.sala){
      return callback({
        error: true,
        mensaje: 'El nombre y la sala son necesarios'
      })
    }

    // Añadimos un usuario a la sala que le corresponde
    client.join(user.sala)

    // si trae el nombre, capturamos el id y lo añademos al chat con su id, su nombre y la sala
    usuarios.addPersona(client.id, user.nombre, user.sala)

    // Se dispara cuando un usuario se conecta. Nos sirve para actualizar la lista de personas que hay en el frontend
    client.broadcast.to(user.sala).emit('listaPersonas', usuarios.getPersonasPorSala(user.sala))
    client.broadcast.to(user.sala).emit('crearMensaje', crearMensaje('Administrador', `${user.nombre} entró`))

    callback(usuarios.getPersonasPorSala(user.sala))

    // Fin de entrarChat
  })

  //Escuchamos mensaje del cliente (usuario)
  client.on('crearMensaje', (data, callback) => {
    let usuario = usuarios.getPersona(client.id)
    let mensaje = crearMensaje(usuario.nombre, data.mensaje)
    // Emitimos el mensaje a todos los usuarios conectados
    client.broadcast.to(usuario.sala).emit('crearMensaje', mensaje)

    callback(mensaje)
  })


  // escuchamos el evento disconnect (evento nativo)
  client.on('disconnect', () =>{
    let personaBorrada = usuarios.deletePersona(client.id)

    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
    // Se dispara, nuevamente, cuando un usuario se desconecta. Nos sirve para actualizar la lista de personas que hay en el frontend
    client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala))
  })

  // Mensajes privados
  client.on('mensajePrivado', data => {
    // Guardamos en una variable al objeto usuario que envia el mensaje
    let emisor = usuarios.getPersona(client.id)

    // Recibimos, dentro del objeto data, el id del destinatario (en data.para) y el mensaje (data.mensaje)
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(emisor.nombre, data.mensaje))
  })


  // Fin de la funcion connection
})