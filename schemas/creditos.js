import { Schema } from 'mongoose'

export const creditosSchema = new Schema({
  CANTIDAD: { type: Number, required: true },
  ID_USUARIO: { type: Number, required: true }
}, { timestamps: true, collection: 'miBanco' })

creditosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})
