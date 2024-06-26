import {
  heroes,
  armors,
  items,
  epics,
  weapons,
  mibanco,
  creditos,
  deckcard,
} from "./database.js";
import { HOST, PORT } from "../config.js";
import fs from "fs";

async function insertIfNotExists(model, filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    data.forEach((element) => {
      model.findOne({ _id: element._id }).then((result) => {
        if (!result) {
          model.create(element).then((result) => {
            console.log("Documento insertado", result);
          });
        }
        if (result) {
          model
            .updateOne({ _id: element._id }, element)
            .then((result) => {
              console.log("Documento actualizado", result);
            })
            .catch((error) => {
              console.error("Error al actualizar documento", error);
            });
        }
      });
    });
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
  console.log(`${HOST}:${PORT}/vitrina/getPrices`);
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

async function updateCards(collection, idCard, data) {
  try {
    // Utiliza un nuevo método para envolver la llamada a updateOne en una promesa
    await collection.updateOne(idCard, data);
    console.log("Documento actualizado exitosamente");
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
  }
}

// Clase para el modelo de la carta
export class CardModel {
  static async getAll(IDs) {
    try {
      const cards = await findCards();
      if (IDs === undefined) return cards;
      const filteredCards = [];
      if (Array.isArray(IDs)) {
        IDs.forEach((id) => {
          cards.find((card) => {
            if (card._id === id) {
              filteredCards.push(card);
            }
          });
        });
      }
      return filteredCards; // Devolver todas las cartas
    } catch (error) {
      console.error("Error al obtener todas las cartas:", error);
      throw error;
    }
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
        return !ids || (Array.isArray(ids) && ids.includes(card._id));
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

  // ? CRUD INVENTARIO

  static async modifyCards(data) {
    try {
      switch (data.TypeCard) {
        case "Hero":
          await updateCards(heroes, { _id: data._id }, data);
          break;
        case "Armor":
          await updateCards(armors, { _id: data._id }, data);
          break;
        case "Item":
          await updateCards(items, { _id: data._id }, data);
          break;
        case "Epic":
          await updateCards(epics, { _id: data._id }, data);
          break;
        case "Weapon":
          await updateCards(weapons, { _id: data._id }, data);
          break;
      }
    } catch (error) {
      console.error("Error al modificar cartas:", error);
    }
  }

  // ? MI BANCO

  static async getBankCard({ IdUsuario }) {
    try {
      let cardsIDs = [];
      const response = await mibanco.find({ ID_USUARIO: IdUsuario });
      console.log(response);
      cardsIDs = response.map((IDs) => {
        return {
          CARTA_ID: IDs.CARTA_ID,
          CANTIDAD: IDs.CANTIDAD,
        };
      });
      console.log(cardsIDs);
      return cardsIDs;
    } catch (e) {
      console.log(e);
    }
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
      const resultado = await mibanco.findOne({
        ID_USUARIO,
        CARTA_ID,
      });
      if (resultado) {
        if (resultado.CANTIDAD <= 0) {
          return {
            success: false,
            message:
              "No se encontró ninguna carta para eliminar, el usuario no tiene cartas",
          };
        } else if (resultado.CANTIDAD > 1) {
          resultado.CANTIDAD -= 1;
          await resultado.save();
          return {
            success: true,
            message: "Carta eliminada exitosamente",
          };
        } else {
          await mibanco.deleteOne({ ID_USUARIO, CARTA_ID });
          return {
            success: true,
            message: "Carta eliminada exitosamente",
          };
        }
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

  static async deleteBankCards({ CARTAS, IdUsuario }) {
    try {
      const ID_USUARIO = IdUsuario;
      console.log(CARTAS);
      CARTAS.forEach(async (carta) => {
        const CARTA_ID = carta.CARTA_ID;
        const resultado = await mibanco.findOne({
          ID_USUARIO,
          CARTA_ID,
        });
        if (resultado) {
          if (resultado.CANTIDAD <= 0) {
            return {
              success: false,
              message:
                "No se encontró ninguna carta para eliminar, el usuario no tiene cartas",
            };
          } else if (resultado.CANTIDAD > carta.CANTIDAD) {
            resultado.CANTIDAD -= carta.CANTIDAD;
            await resultado.save();
            return {
              success: true,
              message: "Carta eliminada exitosamente",
            };
          } else {
            await mibanco.deleteOne({ ID_USUARIO, CARTA_ID });
            return {
              success: true,
              message: "Carta eliminada exitosamente",
            };
          }
        } else {
          return {
            success: false,
            message: "No se encontró ningún documento para eliminar",
          };
        }
      });
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  }

  static async addDeckCard({ IdUsuario, cartas }) {
    try {
      const existingUser = await deckcard.findOne({ ID_USUARIO: IdUsuario });
      console.log(IdUsuario);
      console.log(existingUser);
      if (existingUser) {
        existingUser.CARTAS_IDs = cartas;

        await existingUser.save();

        return existingUser;
      } else {
        // eslint-disable-next-line new-cap
        const newDeck = new deckcard({
          ID_USUARIO: IdUsuario,
          CARTAS_IDs: cartas,
        });
        await newDeck.save();
        return newDeck;
      }
    } catch (e) {
      console.log("Error al guardar el mazo: " + e.message);
    }
  }

  static async getDeckCard({ IdUsuario }) {
    try {
      const response = await deckcard.findOne({ ID_USUARIO: IdUsuario });
      console.log(response.CARTAS_IDs);
      return response.CARTAS_IDs;
    } catch (e) {
      console.log("Error al obtener el mazo: " + e.message);
    }
  }
}
// ? Creditos
export class CreditosModel {
  static async getCreditos(IdUsuario) {
    console.log(IdUsuario);
    const response = await creditos.findOne({ ID_USUARIO: IdUsuario });
    console.log(response);
    return response;
  }

  static async addCreditos({ IdUsuario, CANTIDAD }) {
    try {
      const existingCreditos = await creditos.findOne({
        ID_USUARIO: IdUsuario,
      });

      if (existingCreditos) {
        existingCreditos.CANTIDAD += CANTIDAD;
        await existingCreditos.save();
        return existingCreditos;
      } else {
        // eslint-disable-next-line new-cap
        const newCreditos = new creditos({
          ID_USUARIO: IdUsuario,
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

  static async deleteCreditos({ IdUsuario, CANTIDAD }) {
    try {
      const resultado = await creditos.findOne({ ID_USUARIO: IdUsuario });
      if (resultado) {
        if (resultado.CANTIDAD <= 0) {
          return {
            success: false,
            message:
              "No se encontró ningún crédito para eliminar, el suario tiene 0 créditos",
          };
        } else {
          resultado.CANTIDAD -= CANTIDAD;
          await resultado.save();
          return {
            success: true,
            message: "Créditos eliminados exitosamente",
          };
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
