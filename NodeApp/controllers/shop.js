const express = require('express');
const mongoose = require('mongoose');


let router = express.Router();

let Shop = require('../models/shop.model.js');


/* Enable this code if you want to work with google places api later

const Places = require("google-places-web").default;
Places.apiKey = "AIzaSyDVtNzqKC2DNjm2VjJVTs5L6iWcq-AIqJw";
Places.debug = true;

router.post('/preferred', (req,res)=>{
    let shopName = req.body.shopName;
    let imageUrl = req.body.imageUrl;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let shop = new Shop({
        shopName: shopName,
        imageUrl: imageUrl,
        longitude: longitude,
        latitude: latitude
    })
    shop.save((err, doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log(`Could not save to preferred shops:  ${JSON.stringify(err, undefined, 2)}`);
        }
    })
});

router.get('/nearby',(req,res)=>{
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;

    Places.nearbysearch({
        location: `${latitude},${longitude}`,
        type: ["cafe"],
        radius: 1000,
        rankby: "DISTANCE"
    }).then((response)=>{
        const {results} = response;
        res.send(results);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });  
})
*/

//Fetch all Shops
router.get('/', (req, res)=>{
    Shop.find((err,docs)=>{
        if(docs.length==0){
            console.log("Could not fetch shops");
            return res.status(404).send();
        }

        if(err){
            console.log(err);
            return res.status(500).send();
        }
        console.log(docs);
        res.send(docs);
    })
})

//Fetch a shop by Id
router.get('/:id', (req, res)=>{
    let shopId = req.query._id;
    console.log(shopId);
    Shop.find({_id: mongoose.Types.ObjectId(shopId)},(err,doc)=>{
        if(doc.length==0){
            console.log("Could not fetch shop");
            return res.status(404).send();
        }
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        console.log(doc);
        res.send(doc[0]);
    })
})


module.exports = router;