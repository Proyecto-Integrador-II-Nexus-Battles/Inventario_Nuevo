import mongoose, { model } from 'mongoose'
import { armorSchema, epicasSchema, heroesSchema, itemsSchema, weaponsSchema } from '../schemas/cards.js'
const uri = 'mongodb+srv://dbShaj:4xAsYguGPdiU9EPv@cluster0.4jaifwg.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0'

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
  const precios = {
    'A#0001': 5000,
    'A#0002': 6000,
    'A#0003': 7000,
    'A#0004': 8000,
    'A#0005': 9000,
    'A#0006': 10000,
    'E#0001': 10000,
    'E#0002': 11000,
    'E#0003': 12000,
    'E#0004': 13000,
    'E#0005': 14000,
    'E#0006': 15000,
    'H#0001': 16000,
    'H#0002': 17000,
    'H#0003': 18000,
    'H#0004': 19000,
    'H#0005': 20000,
    'H#0006': 21000,
    'W#0001': 20000,
    'W#0002': 21000,
    'W#0003': 22000,
    'W#0004': 23000,
    'W#0005': 24000,
    'W#0006': 25000,
    'I#0001': 26000,
    'I#0002': 27000,
    'I#0003': 28000,
    'I#0004': 29000,
    'I#0005': 30000,
    'I#0006': 31000
  }

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
        price: precios[prueba.id] // Actualizar el precio
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
  static async getAll (id) {
    let cards = await findCards()
    cards = cards.filter(card => {
      return (
        (!id || card.id.toLowerCase() === id.toLowerCase())
      )
    })
    return cards // Devolver todas las cartas
  }

  static async getEcommerceCard () {
    return obtenerCardsConPrecios()
      .then(cards => {
        return cards
      })
      .catch(error => {
        console.error('Error al obtener pruebas con precios actualizados:', error)
      })
  }
}
