import { Schema } from 'mongoose'

// Esquema de armaduras
export const armorSchema = new Schema({
  id: { type: String, required: true },
  imagePath: { type: String, required: true },
  TypeCard: { type: String, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Subtype: { type: String, required: true },
  DefenseBuff: { type: Number, required: true }
}, { timestamps: true })

armorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

// Esquema de héroes
export const heroesSchema = new Schema({
  id: { type: String, required: true },
  imagePath: { type: String, required: true },
  TypeCard: { type: String, required: true },
  Power: { type: Number, required: true },
  Live: { type: Number, required: true },
  Defense: { type: Number, required: true },
  DamageSides: { type: Number, required: true },
  AttackBase: { type: Number, required: true },
  AttackSides: { type: Number, required: true },
  Subtype: { type: String, required: true },
  Type: { type: String, required: true },
  Name: { type: String, required: true }
}, { timestamps: true })

heroesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})
