import { heroes, armors, items, epics, weapons, mibanco , creditos} from "./database.js";
import { HOST, PORT } from "../config.js";
import mongoose, { model } from "mongoose";
import fs from "fs";

async function insertIfNotExists(model, filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    const count = await model.countDocuments();

    if (count !== data.length) {
      const result = await model.insertMany(data);
      console.log("Documents inserted successfully:", result);
    } else {
      console.log("Collection already has documents. Skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  }
}

export async function databaseCheck() {
  insertIfNotExists(heroes, "./schemas/json/heroes.json");
  insertIfNotExists(armors, "./schemas/json/armor.json");
  insertIfNotExists(items, "./schemas/json/items.json");
  insertIfNotExists(epics, "./schemas/json/epics.json");
  insertIfNotExists(weapons, "./schemas/json/weapons.json");
}

// Función para encontrar todas las cartas
async function findCards() {
  try {
    // Consultar todas las cartas de héroes
    const cardsHeroes = await heroes.find();

    // Consultar todas las cartas de armaduras
    const cardsArmors = await armors.find();

    // Consultar todas las cartas de items
    const cardsItems = await items.find();

    // Consultar todas las cartas de epics
    const cardsEpics = await epics.find();

    // Consultar todas las cartas de weapons
    const cardsWeapons = await weapons.find();

    // Combinar todas las cartas
    const allCards = [
      ...cardsHeroes,
      ...cardsArmors,
      ...cardsItems,
      ...cardsEpics,
      ...cardsWeapons,
    ];

    // Devolver todas las cartas combinadas
    return allCards;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la consulta
    console.error("Error al encontrar cartas:", error);
    throw error; // Relanzar el error para que sea manejado por el código que llama
  }
}


async function obtenerPreciosAPI() {
  const req = await fetch(`${HOST}:${PORT}/vitrina/getPrices`);
  const precios = req.json();
  return precios;
}

async function obtenerCardsConPrecios() {
  try {
    // Obtener los precios de la API
    const precios = await obtenerPreciosAPI();

    // Obtener todos los documentos Prueba
    const pruebas = await findCards();

    // Actualizar los precios en los documentos Prueba
    const pruebasActualizadas = pruebas.map((prueba) => {
      return {
        ...prueba.toObject(), // Convertir el documento Mongoose a un objeto plano
        price: precios[prueba._id], // Actualizar el precio
      };
    });
    // Devolver el nuevo JSON con los precios actualizados
    return pruebasActualizadas;
  } catch (error) {
    console.error("Error al obtener pruebas con precios actualizados:", error);
    throw error;
  }
}

// Clase para el modelo de la carta
export class CardModel {
  static async getAll(IDs) {
    let cards = await findCards();
    console.log(IDs);
    if (IDs) {
      cards = cards.filter((card) => {
        return IDs.includes(card.id);
      });
    }
    return cards; // Devolver todas las cartas
  }

  

  static async getEcommerceCard(id) {
    try {
      let cardsWithPrices = await obtenerCardsConPrecios();
      cardsWithPrices = cardsWithPrices.filter((card) => {
        return !id || card._id.toLowerCase() === id.toLowerCase();
      });
      return cardsWithPrices;
    } catch (error) {
      console.error("Error al obtener cartas con precios actualizados:", error);
      throw error;
    }
  }
  

  static async getCardsbyID(ids) {
    try {
      if (Object.keys(ids).length === 0) {
        return [];
      }
      let cardsWithPrices = await obtenerCardsConPrecios();
      cardsWithPrices = cardsWithPrices.filter((card) => {
        return !ids || ids.includes(card._id);
      });
      return cardsWithPrices;
    } catch (error) {
      console.error("Error al obtener cartas con precios:", error);
      throw error;
    }
  }

  static async filterCards(Type, minPrice, maxPrice, sale, sortOrder) {
    try {
      let cardsWithPrices = await obtenerCardsConPrecios();
      if (typeof sale === "string") {
        sale = sale.toLowerCase() === "true";
      }
      if (sortOrder === "asc") {
        cardsWithPrices.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        cardsWithPrices.sort((a, b) => b.price - a.price);
      }

      cardsWithPrices = cardsWithPrices.filter((card) => {
        return (
          (!Type || card.TypeCard.toLowerCase() === Type.toLowerCase()) &&
          (!minPrice || card.price >= minPrice) &&
          (!maxPrice || card.price <= maxPrice) &&
          (!sale || card.Sale === sale)
        );
      });
      return cardsWithPrices;
    } catch (error) {
      console.error("Error al filtrar cartas con precios:", error);
      throw error;
    }
  }

  // ? MI BANCO

  static async getBankCard({ id: IdUsuario }) {
    let cardsIDs = [];
    const response = await mibanco.find({ ID_USUARIO: IdUsuario });
    cardsIDs = response.map((IDs) => {
      return {
        CARTA_ID: IDs.CARTA_ID,
        CANTIDAD: IDs.CANTIDAD,
      };
    });
    console.log(cardsIDs);
    return cardsIDs;
  }

  static async addBankCard({ CARTA_ID, CANTIDAD, ID_USUARIO }) {
    try {
      // Buscar si ya existe una entrada para el usuario y la carta proporcionados
      const existingCard = await mibanco.findOne({ CARTA_ID, ID_USUARIO });

      if (existingCard) {
        // Si ya existe una entrada, actualizamos la cantidad
        existingCard.CANTIDAD += CANTIDAD;
        await existingCard.save(); // Guardar los cambios en la base de datos
        return existingCard;
      } else {
        // Si no existe una entrada, creamos una nueva
        // eslint-disable-next-line new-cap
        const newCard = new mibanco({
          CARTA_ID,
          CANTIDAD,
          ID_USUARIO,
        });
        await newCard.save(); // Guardar la nueva entrada en la base de datos
        return newCard;
      }
    } catch (error) {
      console.error("Error al agregar carta:", error);
      throw error;
    }
  }

  static async deleteBankCard({ CARTA_ID, ID_USUARIO }) {
    try {
      const resultado = await mibanco.findOneAndDelete({
        ID_USUARIO,
        CARTA_ID,
      });
      if (resultado) {
        return { success: true, message: "Documento eliminado" };
      } else {
        return {
          success: false,
          message: "No se encontró ningún documento para eliminar",
        };
      }
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  }
}


// ? Creditos
export class CreditosModel {
  static async getCreditos(IdUsuario) {
    console.log(IdUsuario);
    const response = await creditos.findOne({ ID_USUARIO : IdUsuario});
    console.log(response);
    return response;
  }

  static async addCreditos({ ID_USUARIO, CANTIDAD }) {
    try {
      
      const existingCreditos = await creditos.findOne({ ID_USUARIO });

      if (existingCreditos) {
        existingCreditos.CANTIDAD += CANTIDAD;
        await existingCreditos.save();
        return existingCreditos;
      } else {
        const newCreditos = new creditos({
          ID_USUARIO,
          CANTIDAD,
        });
        await newCreditos.save();
        return newCreditos;
      }
    } catch (error) {
      console.error("Error al agregar créditos:", error);
      throw error;
    }
  }

  static async deleteCreditos({ ID_USUARIO, CANTIDAD }) {
    try {
      const resultado = await creditos.findOne({ID_USUARIO });
      if (resultado) {
        if(resultado.CANTIDAD == 0){
          resultado.CANTIDAD += CANTIDAD;
          await resultado.save();
          return resultado;
        }else{
          resultado.CANTIDAD -= CANTIDAD;
          await resultado.save();
          return resultado;
        }
      } else {
        return {
          success: false,
          message: "No se encontró ningún crédito para eliminar",
        };
      }
    } catch (error) {
      console.error("Error al eliminar créditos:", error);
    }
  }
}