import { Router } from 'express'
import { cardsController } from '../controllers/controller.js'

export const cardsRoutes = Router()
cardsRoutes.get('/getAllCards', cardsController.getAll)
cardsRoutes.get('/getEcommerceCard', cardsController.getEcommerceCard)
