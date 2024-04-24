import e from "express";
import { CardModel, CreditosModel } from "../models/models.js";

export class cardsController {
  static async getAll(req, res) {
    const { IDs } = req.body;
    console.log(IDs);
    const cards = await CardModel.getAll(IDs);
    res.json(cards);
  }

  static async getCardsbyID(req, res) {
    const ids = req.body;
    const cards = await CardModel.getCardsbyID(ids);
    res.json(cards);
  }

  static async getEcommerceCard(req, res) {
    const { id } = req.params;
    const cards = await CardModel.getEcommerceCard(id);
    res.json(cards);
  }

  static async filterCards(req, res) {
    const { Type, minPrice, maxPrice, sale, sortOrder } = req.query;
    const cards = await CardModel.filterCards(
      Type,
      minPrice,
      maxPrice,
      sale,
      sortOrder
    );
    res.json(cards);
  }

  // ? INVENTARIO CRUD
  static async modifyCard(req, res) {
    try {
      const { data } = req.body;
      console.log({ data });
      await CardModel.modifyCards(data);
      res.status(200).json({
        success: true,
        message: "Carta modificada exitosamente.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error al modificar la carta." });
    }
  }
  // ? Mi Banco

  static async addBankCard(req, res) {
    try {
      const { cartas } = req.body;
      console.log(cartas);
      for (const carta of cartas) {
        const { ID_USUARIO, CARTA_ID, CANTIDAD } = carta;
        await CardModel.addBankCard({ ID_USUARIO, CARTA_ID, CANTIDAD });
      }
      res.status(200).json({
        success: true,
        message: "Carta agregada exitosamente al banco.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error al agregar la carta al banco." });
    }
  }

  static async deleteBankCard(req, res) {
    try {
      const { data } = req.body;
      await CardModel.deleteBankCard(data);
      res.status(200).json({
        success: true,
        message: "Carta eliminada exitosamente del banco.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Hubo un error al eliminar la carta del banco.",
      });
    }
  }

  static async getBankCard(req, res) {
    const { IdUsuario } = req.body;
    const response = await CardModel.getBankCard({ IdUsuario });
    const IDs = [];
    response.forEach((e) => {
      IDs.push(e.CARTA_ID);
    });
    let cards = await CardModel.getAll(IDs);
    cards = cards.map((card) => {
      const cantidad = response.find((e) => e.CARTA_ID === card.id).CANTIDAD;

      return {
        carta: card,
        cantidad: cantidad || 0,
      };
    });
    res.json(cards);
  }

  static async addDeckCard(req, res) {
    const { IdUsuario, cartas } = req.body;
    const response = await CardModel.addDeckCard({ IdUsuario, cartas });
    res.status(200).json({
      success: true,
      message: "Mazo guardado exitosamente en el banco.",
      mazo: response,
    });
  }

  static async getDeckCard(req, res) {
    const { IdUsuario } = req.body;
    const response = await CardModel.getDeckCard({ IdUsuario });
    res.json(response);
  }
}
export class creditosController {
  static async getCredits(req, res) {
    const { IdUsuario } = req.body;
    const credit = await CreditosModel.getCreditos(IdUsuario);
    res.json(credit);
  }

  static async addCredits(req, res) {
    try {
      const { IdUsuario, CANTIDAD } = req.body;
      console.log(IdUsuario, CANTIDAD);
      await CreditosModel.addCreditos({ IdUsuario, CANTIDAD });
      res.status(200).json({
        success: true,
        message: "Creditos agregados exitosamente.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error al agregar los creditos." });
    }
  }

  static async deleteCredits(req, res) {
    try {
      const { IdUsuario, CANTIDAD } = req.body;
      const deleteCred = await CreditosModel.deleteCreditos({
        IdUsuario,
        CANTIDAD,
      });
      res.status(200).json(deleteCred);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error al eliminar los creditos." });
    }
  }
}
