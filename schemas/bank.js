import { Schema } from 'mongoose'

export const miBancoSchema = new Schema({
  CARTA_ID: { type: String, required: true },
  CANTIDAD: { type: Number, required: true },
  ID_USUARIO: { type: Number, required: true }
}, { timestamps: true, collection: 'miBanco' })

miBancoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})
