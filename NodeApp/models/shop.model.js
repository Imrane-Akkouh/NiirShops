const mongoose = require('mongoose');

let shopSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Shop', shopSchema);