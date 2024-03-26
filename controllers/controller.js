import { CardModel } from '../models/models.js'

export class cardsController {
  static async getAll (req, res) {
    const cards = await CardModel.getAll()
    res.json(cards)
  }

  static async getCardsbyID (req, res) {
    const ids = req.body
    const cards = await CardModel.getCardsbyID(ids)
    res.json(cards)
  }

  static async getEcommerceCard (req, res) {
    const { id } = req.params
    const cards = await CardModel.getEcommerceCard(id)
    res.json(cards)
  }
}
