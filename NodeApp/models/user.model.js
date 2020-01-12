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
        shopId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop'
        }
    }]
});

module.exports = mongoose.model('User', userSchema);