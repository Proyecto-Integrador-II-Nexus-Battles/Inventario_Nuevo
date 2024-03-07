const mongoose = require("mongoose");
const weaponsSchema = mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    imagePath: { 
        type: String, 
        required: true }
    ,
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
    //no obligatorios
    AttackBuff: { 
        type: Number, 
        
        default: 0 
    },
    DamageBuff: { 
        type: Number, 
        
        default: 0 
    },
    DefenseBuff: { 
        type: Number, 
        
        default: 0 
    },
    EnemyDamageNerf: { 
        type: Number, 
        
        default: 0 
    },
    Rounds: { 
        type: Number, 
        
        default: 0 
    }
})