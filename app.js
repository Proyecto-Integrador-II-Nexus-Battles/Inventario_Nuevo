import cors from 'cors'
import express, { json } from 'express'
import { cardsRoutes } from './routes/routes.js' // --> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión
import { CardModel } from './models/models.js'

const app = express() // --> Iniciamos express
app.use(json())
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by
app.use(cors())
app.use('/inventario', cardsRoutes)

const PORT = process.env.PORT || 1234 // --> Usar la variable de entorno PORT, si no usar el port 3000

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})

CardModel.getEcommerceCard();