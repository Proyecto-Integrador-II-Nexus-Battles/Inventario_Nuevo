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
router.put("/Hero/:_id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { nombre } = req.body;
    heroSchema
    .updateOne({_id: id}, {$set:{nombre/*campos a modificar separados por coma*/ }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//DELETE hero
router.delete("/Hero/:_id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { ud } = req.param;
    heroSchema
    .remove({_id: id}, {$set:{nombre/*campos a modificar separados por coma*/ }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;