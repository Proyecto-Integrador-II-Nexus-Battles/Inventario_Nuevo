const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
    _id: { 
        type: String, required: true
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
        required: true 
    },
    Type: { 
        type: String, 
        required: true 
    },
    Subtype: { 
        type: String, 
        required: true 
    },
    Description: { 
        type: String, 
        required: true 
    },
    //No obligatorios
    DamageBuff: { 
        type: Number, 
    
        default: 0 
    },
    EnemyDamageNerf: { 
        type: String, 
        
        default: null 
    },
    RounTimer: { 
        type: Number, 
        
        default: 0 
    },
    DamageXBuster: {
        type: Number,
        
        default: 1
    },
    Rounds: {
        type: Number,
        
        default: 0
    },
    LiveNerf: {
        type: Number,
        
        default: 0
    }
})


module.exports = mongoose.model('Items', itemsSchema, "Items")