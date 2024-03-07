const express = require("express");
const armorsSchema = require ("../models/armors");

const router = express.Router();


//CREATE DATA
router.post("/Armors", (req, res) => {
    const armor = armorsSchema(req.body);
    console.log(req.body);
    armor 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET ALL DATA
router.get("/Armors", (req, res) => {
    armorsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET DATA by ID
router.get("/Armors/:_id", (req, res) => {
    const { _id } = req.params;
    armorsSchema
    .findById(_id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//Update hero   
router.put("/Armors/:id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { id } = req.params;
    const { Name } = req.body;
    armorsSchema
    .updateOne({_id: id}, {$set:{Name/*campos a modificar separados por coma*/ }})   
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//DELETE hero
router.delete("/Armors/:id", (req, res) => {
    const { id } = req.params;
    armorsSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});




module.exports = router;