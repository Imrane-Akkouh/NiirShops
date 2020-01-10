const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    preferredShops:[{
        shopId:{
            type: Schema.Types.ObjectId
        }
    }]
});

module.exports = mongoose.model('User', userSchema)