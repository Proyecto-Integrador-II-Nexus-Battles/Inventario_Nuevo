import cors from 'cors'
import express, { json } from 'express'
import { cardsRoutes } from './routes/routes.js' // --> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión
import { CardModel, databaseCheck } from './models/models.js'
import { APP_PORT } from './config.js'
import fs from 'fs'
import http from 'http'
import https from 'https'

const app = express() // --> Iniciamos express
app.use(json())
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by
app.use(cors())
app.use('/inventario', cardsRoutes)

const options = {
  key: fs.readFileSync('certs/privkey.pem'),
  cert: fs.readFileSync('certs/cert.pem')
}

http.createServer(app).listen(30)
https.createServer(options, app).listen(APP_PORT)
console.log(`Server running on port https://localhost:${APP_PORT}`)

CardModel.getEcommerceCard()
databaseCheck()
