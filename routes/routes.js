import { Router } from "express";
import {
  cardsController,
  creditosController,
} from "../controllers/controller.js";

export const cardsRoutes = Router();

// ? <--INVENTARIO-->
cardsRoutes.get("/getAllCards", cardsController.getAll); // Devuelve todas las catas //*(requerido en inventario)
cardsRoutes.get("/getEcommerceCard", cardsController.getEcommerceCard); // Devuelve todas las catas en venta con sus respectivos pecios //*(requerido en Ecommerce)
cardsRoutes.patch("/modifyCard", cardsController.modifyCard);

// ?  <--MI BANCO-->
cardsRoutes.get("/getEcommerceCard/:id", cardsController.getEcommerceCard);
cardsRoutes.get("/cards", cardsController.filterCards);
cardsRoutes.get("/get/cards/cart");
cardsRoutes.post("/getCardsByIDs", cardsController.getAll); // Devuelve los atibutos de las catas por los IDs ingresados //*(Requerido en miBanco y carritoDeCompra)
cardsRoutes.post("/add-cards", cardsController.addBankCard); // Agrega cartas a la base de datos de invetario //*(requerido en miBanco, carritoCompras y subasta)
cardsRoutes.post("/getBankCards", cardsController.getBankCard); // Devuelve todas las cartas del usuario //*(requerido en miBanco)
cardsRoutes.post("/getCardsbyID", cardsController.getCardsbyID);
cardsRoutes.post("/deckCard", cardsController.addDeckCard);
cardsRoutes.post("/getDeckCard", cardsController.getDeckCard);
cardsRoutes.delete("/delete-card", cardsController.deleteBankCard); // Elimina las cartas de mi banco
cardsRoutes.delete("/delete/cards", cardsController.deleteBankCards);

// ?  <--CREDITOS-->
cardsRoutes.post("/add-creditos", creditosController.addCredits);
cardsRoutes.get("/get-creditos", creditosController.getCredits);
cardsRoutes.post("/delete-creditos", creditosController.deleteCredits);
