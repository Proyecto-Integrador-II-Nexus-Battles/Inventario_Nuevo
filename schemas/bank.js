import { Schema } from 'mongoose'

export const miBancoSchema = new Schema({
  userID: { type: String, required: true },
  cardID: { type: String, required: true },
  quantity: { type: String, required: true }
}, { timestamps: true, collection: 'miBanco' })

miBancoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})
