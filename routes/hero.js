const express = require("express");
const heroSchema = require ("../Models/hero");

const router = express.Router();


//CREATE DATA
router.post("/Hero", (req, res) => {
    const hero = heroSchema(req.body);
    console.log(req.body);
    hero 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET ALL DATA
router.get("/Hero", (req, res) => {
    heroSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET DATA by ID
router.get("/Hero/:_id", (req, res) => {
    const { _id } = req.params;
    heroSchema
    .findById(_id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//Update hero   
router.put("/Hero/:id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { id } = req.params;
    const { Name } = req.body;
    heroSchema
    .updateOne({_id: id}, {$set:{Name/*campos a modificar separados por coma*/ }})   
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//DELETE hero
router.delete("/Hero/:id", (req, res) => {
    const { id } = req.params;
    heroSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;