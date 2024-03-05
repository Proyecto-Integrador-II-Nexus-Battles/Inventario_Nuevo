const mongoose = require("mongoose");


const heroSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    TypeCard: {
        type: String, 
        required: true
    },
    Power: {
        type: Number, 
        required: true
    },
    Live: {
        type: Number, 
        required: true
    },
    Defense: {
        type: Number, 
        required: true
    },
    DamageSides: {
        type: Number, 
        required: true
    },
    AttackBase: {
        type: Number, 
        required: true
    },
    AttackSides: {
        type: Number, 
        required: true
    },
    Subtype: {
        type: String, 
        required: true
    },
    TypeH: {
        type: String, 
        required: true
    }
    ,
    Name: {
        type: String, 
        required: true
    } 
})

module.exports = mongoose.model('Hero', heroSchema, 'Hero');