import mongoose, { model } from 'mongoose'
import { armorSchema, heroesSchema } from '../schemas/cards.js'
const uri = 'mongodb+srv://dbShaj:4xAsYguGPdiU9EPv@cluster0.4jaifwg.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri)
  .then(() => console.log('Conectado a MONGODB'))
  .catch((error) => console.error(error))

const heroes = model('cards_heroes', heroesSchema)
const armors = model('cards_armors', armorSchema)

// Función para encontrar todas las cartas
async function findCards () {
  try {
    // Consultar todas las cartas de héroes
    const cardsHeroes = await heroes.find()

    // Consultar todas las cartas de armaduras
    const cardsArmors = await armors.find()
    const allCards = [...cardsHeroes, ...cardsArmors]

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
  static async getAll () {
    return await findCards() // Devolver todas las cartas
  }
}
