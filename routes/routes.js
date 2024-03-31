import { Router } from 'express'
import { cardsController } from '../controllers/controller.js'

export const cardsRoutes = Router()

cardsRoutes.get('/getAllCards', cardsController.getAll)
cardsRoutes.get('/getEcommerceCard', cardsController.getEcommerceCard)
cardsRoutes.get('/getEcommerceCard/:id', cardsController.getEcommerceCard)
cardsRoutes.post('/getCardsbyID', cardsController.getCardsbyID)
cardsRoutes.get('/cards', cardsController.filterCards) 
