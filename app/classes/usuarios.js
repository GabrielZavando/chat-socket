// Clases para el manejo de Usuarios

class Usuarios{
  constructor(){
    this.personas = []
  }

  // Agregamos una persona al chat
  addPersona(id, nombre, sala){
    // Creamos una persona
    let persona = {
      id,
      nombre,
      sala
    }

    // Agregamos la persona al array de personas del constructor
    this.personas.push(persona)

    // Retornamos el array de personas
    return this.personas
  }
  
  // Para obtener una persona
  getPersona(id){
    // Recorremos y filtramos el array de personas. La que coincida con id que nos llega por parametro nos la devuelve y la guardamos en una variable

    // filer devuelve un nuevo Array (en este caso un Array con un solo objeto). Por lo tanto, para obtener el objeto que viene dentro capturamos la primera posición del Array
    let persona = this.personas.filter(pers =>{
      return pers.id === id
    })[0]

    // retornamos la persona que tendrá undefined, null o un objeto con los datos de la persona si encuentra una coincidencia
    return persona
  }

  // Para obtener todas las personas
  getPersonas(){
    return this.personas
  }

  // Para obtner personas por sala
  getPersonasPorSala(sala){
    let personasEnSala = this.personas.filter(persona => persona.sala === sala)

    return personasEnSala
  }

  // Para eliminar a una persona del chat (porque se desconecto o lo que sea)
  deletePersona(id){
    // Guardamos el objeto de la persona borrada para no perder la referencia
    let personaBorrada = this.getPersona(id)

    // Filtramos el array de personas y excluimos al que coincida con el id
    this.personas = this.personas.filter(pers => {
      // Retorna todos los objetos cuyo id sea distinto al que nos llega por parametro
      return pers.id != id
    })

    // devolvemos como valor el objeto personaBorrada
    return personaBorrada
  }

}

module.exports = {
  Usuarios
}