const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const heroRoutes = require("./routes/hero");

const app = express();
const port =  process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(heroRoutes);


//mongodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('conected to Mongodb atlas'))
.catch((error => console.error(error))); 

app.listen(port, () => console.log('server listering on port', port));