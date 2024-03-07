const express = require("express");
const weaponsSchema = require ("../models/weapons");

const router = express.Router();


//CREATE DATA
router.post("/Weapons", (req, res) => {
    const hero = weaponsSchema(req.body);
    console.log(req.body);
    hero 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET ALL DATA
router.get("/Weapons", (req, res) => {
    weaponsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET DATA by ID
router.get("/Weapons/:_id", (req, res) => {
    const { _id } = req.params;
    weaponsSchema
    .findById(_id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//Update hero   
router.put("/Weapons/:id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { id } = req.params;
    const { Name } = req.body;
    weaponsSchema
    .updateOne({_id: id}, {$set:{Name/*campos a modificar separados por coma*/ }})   
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//DELETE hero
router.delete("/Weapons/:id", (req, res) => {
    const { id } = req.params;
    weaponsSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});




module.exports = router;