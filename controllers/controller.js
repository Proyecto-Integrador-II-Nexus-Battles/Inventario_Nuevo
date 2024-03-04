import { CardModel } from '../models/models.js'

export class cardsController {
  static async getAll (req, res) {
    const cards = await CardModel.getAll()
    res.json(cards)
  }

  static async create (req, res) {

  }
}
