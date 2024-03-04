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

    const allCards = [...cardsHeroes, ...cardsArmors, ...cardsItems, ...cardsEpics, ...cardsWeapons]

    // Devolver todas las cartas combinadas
    return allCards
  } catch (error) {
    // Manejar cualquier error que ocurra durante la consulta
    console.error('Error al encontrar cartas:', error)
    throw error // Relanzar el error para que sea manejado por el código que llama
  }
}

// Clase para el modelo de la carta
export class CardModel {
  static async getAll (id) {
    let cards = await findCards()
    console.log(cards)

    cards = cards.filter(card => {
      return (
        (!id || card.id.toLowerCase() === id.toLowerCase())
      )
    })
    return cards // Devolver todas las cartas
  }
}
