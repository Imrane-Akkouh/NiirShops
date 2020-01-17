const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();

let User = require('../models/user.model.js');

let current_user = null;

//Create a new User
router.post('/', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let user = new User({
        username: username,
        password: password,
        preferredShops: []
    })
    user.save((err, doc)=>{
        if(!err){
            current_user = doc[0];
            res.send(doc);
        }else{
            console.log(`Could not create a user`);
        }
    })
});

//Fetch a User's details
router.get('/login', (req,res)=>{
    let username = req.query.username;
    let password = req.query.password;
    User.find({'username': username, 'password': password}, (err,doc)=>{
        if(doc.length==0){
            console.log("Could not find a matching user");
            return res.send(null);
        }
        if(err){
            console.log(err);
            return res.send(null);
        }
        current_user = doc[0];
        res.send(doc);
    });
})

//Update a User's details
router.put('/current_user', (req,res)=>{
    let preferredShop = req.body.shopId;
    let indexOfpreferredShop = current_user.preferredShops.indexOf(preferredShop);
    if(indexOfpreferredShop!=-1){
        current_user.preferredShops.splice(current_user.preferredShops.indexOf(preferredShop),1);
    }else{
        current_user.preferredShops.push(preferredShop);
    }
    User.find({_id: mongoose.Types.ObjectId(current_user._id)}).then(user=>{
        user[0].preferredShops=current_user.preferredShops;
        user[0].save();
    }).then((doc)=>{
        console.log('Updated user successfully');
    }).catch((err)=>{
        console.log(err);
    })
})

//provide current user to frontend
router.get('/current_user', (req,res)=>{
    res.send(current_user);
})

//logout
router.get('/logout', (req,res)=>{
    current_user = null;
    res.send(current_user);
})


module.exports = router;