const express = require("express");
const bodyParser = require("body-parser");


let app = express();
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Nodejs server started running at : http://localhost:3000');
})
