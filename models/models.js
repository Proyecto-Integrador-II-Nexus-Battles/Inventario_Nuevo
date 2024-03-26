import mongoose, { model } from 'mongoose'
import { armorSchema, epicasSchema, heroesSchema, itemsSchema, weaponsSchema } from '../schemas/cards.js'
const uri = 'mongodb+srv://jreyess11:Mncdm2024.@cluster0.ztojprw.mongodb.net/'

mongoose.connect(uri)
  .then(() => console.log('Conectado a MONGODB'))
  .catch((error) => console.error(error))

const heroes = model('cards_heroes', heroesSchema)
const armors = model('cards_armors', armorSchema)
const items = model('cards_items', itemsSchema)
const epics = model('cards_epics', epicasSchema)
const weapons = model('cards_weapons', weaponsSchema)

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
  const req = await fetch('http://localhost:3000/vitrina/getPrices')
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
  static async getAll () {
    let cards = await findCards()
    return cards // Devolver todas las cartas
  }

  static async getEcommerceCard(id) {
    try {
      let cardsWithPrices = await obtenerCardsConPrecios();
      cardsWithPrices = cardsWithPrices.filter(card => {
        return (
          (!id || card._id.toLowerCase() === id.toLowerCase())
        )
      })
      return cardsWithPrices;
    } catch (error) {
      console.error('Error al obtener cartas con precios actualizados:', error);
      throw error;
    }
  }

  static async getCardsbyID(ids) {
    try {
      let cardsWithPrices = await obtenerCardsConPrecios();
      cardsWithPrices = cardsWithPrices.filter(card => {
        return (
          (!ids || ids.includes(card._id))
        )
      })
      return cardsWithPrices;
    } catch (error) {
      console.error('Error al obtener cartas con precios:', error);
      throw error;
    }
  }

}