const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NiirShops',(err)=>{
    if(!err){
        console.log('Connected to MongoDb successfully');
    }else{
        console.log('Failed to connect to MongoDB' + JSON.stringify(err, undefined, 2))
    }
})

module.exports = mongoose;