import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

export const PORT = process.env.PORT || 5000
export const HOST = process.env.HOST || 'localhost'
export const APP_PORT = process.env.APP_PORT || 3000

export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb+srv://jreyess11:Mncdm2024.@cluster0.ztojprw.mongodb.net/'
