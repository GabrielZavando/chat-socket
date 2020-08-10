var socket = io();

var params = new URLSearchParams(window.location.search)
 // Si no va un nombre como parametro por url
 // Ej chat.html?nombre=Gabriel
if(!params.has('nombre') || !params.has('sala')){
  // Lo enviamos a la página en donde inicia sesión
  window.location = 'index.html'
  throw new Error('El nombre y sala son necesarios')
}

var usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala')
}

// Se dispara el evento connect cuando está abierta esta url en una pestaña de un navegador y en backend también está corriendo nuestro servidor
socket.on('connect', function(){
  console.log('Conectado al servidor')

  // emitimos los datos de quien se conecta (usuario) y recibimos el callback
  socket.emit('entrarChat', usuario, function(resp){
    console.log('Usuarios conectados', resp)
  })
})

// Evento que se dispara cuando perdemos conexión con el servidor
socket.on('disconnect', function(){
  console.log('Perdimos conexión con el servidor')
})

// Emitir información: Recibe un nombre y luego la información que vamos a emitir. Puede ser un string, un boolean o un objeto. Se recomienda enviar objetos
// socket.emit('enviarMensaje', {
//   usuario: 'Gabriel',
//   mensaje: 'Hola Mundo'
//   // Para saber si el mensaje emitido acá fue correctamente enviado al servidor podemos pasar, como tercer parametro, un callback. Además debemos hacer una configuración en el lado del servidor
// }, function(resp){
//   console.log('Se disparó el callback', resp)
// })

// Escucha informacion
socket.on('crearMensaje', function(mensaje){
  console.log('Servidor', mensaje)
})

// Obtener lista de usuarios conectados
socket.on('listaPersonas', function(usuarios){
  console.log(usuarios)
})

//Mensajes privados
socket.on('mensajePrivado', function(mensaje ){
  console.log('Mensaje Privado:', mensaje)
})