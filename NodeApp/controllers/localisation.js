const express = require('express');
let ipapi = require('ipapi.co');

let router = express.Router();

router.get('/localisation',(req,res)=>{

    ipapi.location((loc)=>{ //Consuming the api to get our current localisation
        res.send(loc);        
    })
})

module.exports = router;