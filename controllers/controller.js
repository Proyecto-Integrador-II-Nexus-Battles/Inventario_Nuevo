import { CardModel } from '../models/models.js'

export class cardsController {
  static async getAll (req, res) {
    const { IDs } = req.body
    console.log(IDs)
    const cards = await CardModel.getAll(IDs)
    res.json(cards)
  }

  static async getEcommerceCard (req, res) {
    const cards = await CardModel.getEcommerceCard()
    res.json(cards)
  }

  static async addBankCard (req, res) {
    try {
      const { userID, cardID, quantity } = req.body
      console.log(userID, cardID, quantity)
      await CardModel.addBankCard({ cardID, quantity, userID })
      res.status(200).json({ success: true, message: 'Carta agregada exitosamente al banco.' })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error al agregar la carta al banco.' })
    }
  }

  static async getBankCard (req, res) { // ! PROVICIONAL
    const { id } = req.body
    const IDs = await CardModel.getBankCard({ id })
    const cards = await CardModel.getAll(IDs)
    res.json(cards)
  }
}
