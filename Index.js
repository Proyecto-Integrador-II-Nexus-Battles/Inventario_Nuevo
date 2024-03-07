
const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const heroRoutes = require("./routes/hero");
const itemsRoutes = require("./routes/items");
const cors = require('cors')

const app = express(); 
const port =  process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());
app.use(heroRoutes);
app.use(itemsRoutes);

//permite la consulta desde cualquier dominio



//PARA LAS OSLICITUDES
//CUANDO SOLICITEN LA RUTA , QUIERO QUE RESOPNDA UN TEXTO QUE DIGA PONG


//mongodb connection, devuelve un mensaje si se realiza la coneccion ademas del puerdo que se usa
mongoose
.connect(process.env.MONGODB_URIDOS)
.then(() => console.log('conected to Mongodb atlas'))
.catch((error => console.error(error))); 

app.listen(port, () => console.log('server listering on port', port));


