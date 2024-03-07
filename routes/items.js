const express = require("express");

const itemsSchema = require ("../Models/items");
const router = express.Router();
//GET ALL DATA
router.get("/Items", (req, res) => {
    itemsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;