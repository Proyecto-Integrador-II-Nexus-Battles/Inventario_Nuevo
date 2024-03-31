import mongoose from 'mongoose'
import { armorSchema, epicasSchema, heroesSchema, itemsSchema, weaponsSchema } from '../schemas/cards.js'
import { miBancoSchema } from '../schemas/bank.js'
import { MONGO_URI } from '../config.js'

// const uri = 'mongodb+srv://dbShaj:4xAsYguGPdiU9EPv@cluster0.4jaifwg.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MONGODB'))
  .catch((error) => console.error(error))

export const heroes = mongoose.model('cards_heroes', heroesSchema)
export const armors = mongoose.model('cards_armors', armorSchema)
export const items = mongoose.model('cards_items', itemsSchema)
export const epics = mongoose.model('cards_epics', epicasSchema)
export const weapons = mongoose.model('cards_weapons', weaponsSchema)
export const mibanco = mongoose.model('miBanco', miBancoSchema)
