const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./controllers/user");
const shopController = require("./controllers/shop");
const localisationController = require("./controllers/localisation");

const mongoose = require('mongoose');


let app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Handling users authentication
app.use('/users', userController);

//Handling shops interactions
app.use('/shops', shopController);

//Fetching localisation using the actual ip address
app.use('/api', localisationController);

//url of the connection, change it depending your use case
//let mongoUrl = 'mongodb://localhost:27017/NiirShops';
let mongoUrl = 'mongodb+srv://admin:itistheadmin@cluster0-sho9j.mongodb.net/NiirShops';

//Setting up connection with mongodb and starting the server
mongoose.connect(mongoUrl)
.then(res=>{
    app.listen(3000,()=>{
        console.log('Connected successfully to mongodb.')
        console.log('Nodejs server started running at : http://localhost:3000');
    })
}).catch(err=>{
        console.log('Failed to connect to MongoDB' + JSON.stringify(err, undefined, 2));
})