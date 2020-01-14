const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    preferredShops:[{
        type: String
    }]
});

module.exports = mongoose.model('User', userSchema);