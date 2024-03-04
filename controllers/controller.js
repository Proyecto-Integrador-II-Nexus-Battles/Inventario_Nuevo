import { CardModel } from '../models/models.js'

export class cardsController {
  static async getAll (req, res) {
    const { id } = req.body

    const cards = await CardModel.getAll(id)
    res.json(cards)
  }
}
