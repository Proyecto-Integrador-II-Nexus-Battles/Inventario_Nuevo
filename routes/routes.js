import { Router } from 'express'
import { cardsController } from '../controllers/controller.js'

export const cardsRoutes = Router()

// ? <--INVENTARIO-->
cardsRoutes.get('/getAllCards', cardsController.getAll) // Devuelve todas las catas //*(requerido en inventario)
cardsRoutes.get('/getEcommerceCard', cardsController.getEcommerceCard) // Devuelve todas las catas en venta con sus respectivos pecios //*(requerido en Ecommerce)

// ?  <--MI BANCO-->

cardsRoutes.post('/getCardsByIDs', cardsController.getAll) // Devuelve los atibutos de las catas por los IDs ingresados //*(Requerido en miBanco y carritoDeCompra)
cardsRoutes.post('/add-cards', cardsController.addBankCard) // Agrega cartas a la base de datos de invetario //*(requerido en miBanco, carritoCompras y subasta)
cardsRoutes.post('/getBankCards', cardsController.getBankCard) // Devuelve todas las cartas del usuario //*(requerido en miBanco)
cardsRoutes.delete('/delete-card', cardsController.deleteBankCard) // Elimina las cartas de mi banco
