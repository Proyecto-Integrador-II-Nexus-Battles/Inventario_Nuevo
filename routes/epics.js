const express = require("express");
const epicsSchema = require ("../models/epics");

const router = express.Router();


//CREATE DATA
router.post("/Epics", (req, res) => {
    const epic = epicsSchema(req.body);
    console.log(req.body);
    epic 
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET ALL DATA
router.get("/Epics", (req, res) => {
    epicsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//GET DATA by ID
router.get("/Epics/:_id", (req, res) => {
    const { _id } = req.params;
    epicsSchema
    .findById(_id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//Update hero   
router.put("/Epics/:id", (req, res) => {
    //dentro de {iran los campos que se modificaran}
    const { id } = req.params;
    const { Name } = req.body;
    epicsSchema
    .updateOne({_id: id}, {$set:{Name/*campos a modificar separados por coma*/ }})   
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//DELETE hero
router.delete("/Epics/:id", (req, res) => {
    const { id } = req.params;
    epicsSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});




module.exports = router;