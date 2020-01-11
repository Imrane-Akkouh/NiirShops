const express = require("express");
const bodyParser = require("body-parser");

const userController = require("./controllers/user");

const mongoose = require('mongoose');


let app = express();
app.use(bodyParser.json());

//Handling users authentication
app.use('/users', userController);

//Setting up connection with mongodb and starting the server
mongoose.connect('mongodb://localhost:27017/NiirShops')
.then(res=>{
    app.listen(3000,()=>{
        console.log('Connected successfully to mongodb.')
        console.log('Nodejs server started running at : http://localhost:3000');
    })
}).catch(err=>{
        console.log('Failed to connect to MongoDB' + JSON.stringify(err, undefined, 2));
})
