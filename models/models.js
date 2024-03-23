import { heroes, armors, items, epics, weapons, mibanco } from './database.js'

async function shopCart (id) { // ! PROVICIONAL
  const response = await fetch('http://localhost:3000/movies/getCards', { // Ruta para carrito de compras
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  console.log('despues del fetch')
  const cards = await response.json()
  return cards
}
async function auction (id) { // ! PROVICIONAL
  const response = await fetch('http://localhost:3000/movies/getCards', { // Ruta para subasta
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  const cards = await response.json()
  return cards
}

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
  const req = await fetch('http://gateway.thenexusbattlesii.online:5000/vitrina/getPrices')
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
  // ? INVENTARIO
  static async getAll (IDs) {
    let cards = await findCards()
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

  static async addBankCard ({ CARTA_ID, CANTIDAD, ID_USUARIO }) {
    try {
      console.log('MODEL', CARTA_ID, CANTIDAD, ID_USUARIO)
      // eslint-disable-next-line new-cap
      const newCard = new mibanco({
        ID_USUARIO,
        CARTA_ID,
        CANTIDAD
      })
      await newCard.save()
      return newCard
    } catch (error) {
      console.error('Error al agregar carta:', error)
      throw error
    }
  }

  static async getBankCard ({ id }) { //! PROVICIONAL
    console.log('model')
    const cardShopCart = await shopCart(id)
    const cardAuction = await auction(id)
    const allCards = [...cardShopCart, ...cardAuction]
    return allCards
  }
}
