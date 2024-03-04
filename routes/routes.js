import { Router } from 'express'
import { cardsController } from '../controllers/controller.js'

export const cardsRoutes = Router()
cardsRoutes.get('/info_cartas', cardsController.getAll)
