import { heroes, armors, items, epics, weapons, mibanco } from './database.js'
import { HOST, PORT } from '../config.js'

// Función para encontrar todas las cartas
async function findCards () {
  try {
    // Consultar todas las cartas de héroes
    const cardsHeroes = await heroes.find()

    // Consultar todas las cartas de armaduras
    const cardsArmors = await armors.find()

    // Consultar todas las cartas de items
    const cardsItems = await items.find()

    // Consultar todas las cartas de epics
    const cardsEpics = await epics.find()

    // Consultar todas las cartas de weapons
    const cardsWeapons = await weapons.find()

    // Combinar todas las cartas
    const allCards = [...cardsHeroes, ...cardsArmors, ...cardsItems, ...cardsEpics, ...cardsWeapons]

    // Devolver todas las cartas combinadas
    return allCards
  } catch (error) {
    // Manejar cualquier error que ocurra durante la consulta
    console.error('Error al encontrar cartas:', error)
    throw error // Relanzar el error para que sea manejado por el código que llama
  }
}

async function obtenerPreciosAPI () {
  const req = await fetch(`${HOST}:${PORT}/vitrina/getPrices`)
  const precios = req.json()

  return precios
}

async function obtenerCardsConPrecios () {
  try {
    // Obtener los precios de la API
    const precios = await obtenerPreciosAPI()

    // Obtener todos los documentos Prueba
    const pruebas = await findCards()

    // Actualizar los precios en los documentos Prueba
    const pruebasActualizadas = pruebas.map(prueba => {
      return {
        ...prueba.toObject(), // Convertir el documento Mongoose a un objeto plano
        price: precios[prueba._id] // Actualizar el precio
      }
    })

    // Devolver el nuevo JSON con los precios actualizados
    return pruebasActualizadas
  } catch (error) {
    console.error('Error al obtener pruebas con precios actualizados:', error)
    throw error
  }
}

// Clase para el modelo de la carta
export class CardModel {
  static async getAll (IDs) {
    let cards = await findCards()
    console.log(IDs)
    if (IDs) {
      cards = cards.filter(card => {
        return (
          IDs.includes(card.id)
        )
      })
    }
    return cards // Devolver todas las cartas
  }

  static async getEcommerceCard () {
    return obtenerCardsConPrecios()
      .then(cards => {
        return cards.filter(card => card.OnSale)
      })
      .catch(error => {
        console.error('Error al obtener pruebas con precios actualizados:', error)
      })
  }

  // ? MI BANCO

  static async getBankCard ({ id }) {
    console.log(id)
    let cardsIDs = []
    const response = await mibanco.find(
      { ID_USUARIO: id }
    )
    cardsIDs = response.map(IDs => {
      return {
        CARTA_ID: IDs.CARTA_ID,
        CANTIDAD: IDs.CANTIDAD
      }
    })
    console.log(cardsIDs)
    return cardsIDs
  }

  static async addBankCard ({ CARTA_ID, CANTIDAD, ID_USUARIO }) {
    try {
      // Buscar si ya existe una entrada para el usuario y la carta proporcionados
      const existingCard = await mibanco.findOne({ CARTA_ID, ID_USUARIO })

      if (existingCard) {
        // Si ya existe una entrada, actualizamos la cantidad
        existingCard.CANTIDAD += CANTIDAD
        await existingCard.save() // Guardar los cambios en la base de datos
        return existingCard
      } else {
        // Si no existe una entrada, creamos una nueva
        // eslint-disable-next-line new-cap
        const newCard = new mibanco({
          CARTA_ID,
          CANTIDAD,
          ID_USUARIO
        })
        await newCard.save() // Guardar la nueva entrada en la base de datos
        return newCard
      }
    } catch (error) {
      console.error('Error al agregar carta:', error)
      throw error
    }
  }

  static async deleteBankCard ({ CARTA_ID, ID_USUARIO }) {
    try {
      const resultado = await mibanco.findOneAndDelete({ ID_USUARIO, CARTA_ID })
      if (resultado) {
        return { success: true, message: 'Documento eliminado' }
      } else {
        return { success: false, message: 'No se encontró ningún documento para eliminar' }
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error)
    }
  }
}
