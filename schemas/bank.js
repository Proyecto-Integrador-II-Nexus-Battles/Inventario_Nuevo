import { Schema } from "mongoose";

export const miBancoSchema = new Schema(
  {
    CARTA_ID: { type: String, required: true },
    CANTIDAD: { type: Number, required: true },
    ID_USUARIO: { type: Number, required: true },
  },
  { timestamps: true, collection: "miBanco" }
);

miBancoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

export const deckCardSchema = new Schema ({
  ID_USUARIO: { type: Number, required: true },
  ID_HEROE: { type: String, required: true },
  CARTAS_IDs: { type: [String], required: true }
}, { timestamps: true, collection: 'miBanco' })

deckCardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})
