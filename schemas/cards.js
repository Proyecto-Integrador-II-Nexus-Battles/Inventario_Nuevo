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

// Esquema de items

export const itemsSchema = new Schema({
  id: { type: String, required: true },
  imagePath: { type: String, required: true },
  TypeCard: { type: String, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Subtype: { type: String, required: true },
  Description: { type: String, required: true },
  DamageBuff: { type: Number, required: false, default: 0 },
  EnemyDamageNerf: { type: String, required: false, default: null },
  RounTimer: { type: Number, required: false, default: 0 }
}, { timestamps: true })

itemsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

// Esquema de epicas

export const epicasSchema = new Schema({
  id: { type: String, required: true },
  imagePath: { type: String, required: true },
  TypeCard: { type: String, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Subtype: { type: String, required: true }, //
  EspecialDescriptionBuff: { type: String, required: false, default: null },
  NormalLiveBuff: { type: Number, required: false, default: 0 },
  EspecialDamageBuff: { type: Number, required: true, default: 0 },
  NormalDamageBuff: { type: Number, required: true, default: 0 },
  NormalDescriptionDebuff: { type: String, required: false, default: null },
  EnemyDamageNerf: { type: String, required: false, default: null },
  RounTimer: { type: Number, required: false, default: 0 }
}, { timestamps: true })

epicasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

export const weaponsSchema = new Schema({
  id: { type: String, required: true },
  imagePath: { type: String, required: true },
  TypeCard: { type: String, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Subtype: { type: String, required: true },
  AttackBuff: { type: Number, required: false, default: 0 },
  DamageBuff: { type: Number, required: false, default: 0 },
  DefenseBuff: { type: Number, required: false, default: 0 },
  EnemyDamageNerf: { type: Number, required: false, default: 0 },
  Rounds: { type: Number, required: false, default: 0 }
})

weaponsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})
