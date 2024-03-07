const mongoose = require("mongoose");

const armorSchema = mongoose.Schema({
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
    Name: { 
        type: String, 
        required: true },
    Type: { 
        type: String, 
        required: true 
    },
    Subtype: { 
        type: String, 
        required: true 
    },
    DefenseBuff: { 
        type: Number,
        required: true 
    }
})