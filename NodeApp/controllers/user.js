const express = require('express');

let router = express.Router();

let User = require('../models/user.model.js');

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
            res.send(doc);
        }else{
            console.log(`Could not create a user`);
        }
    })
});

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
        res.send(doc);
    });
})

router.put('/:username', (req,res)=>{
    let preferredShops = req.query.user.preferredShops;
    User.findById(req.query.user._id).then(user=>{
        user.preferredShops = preferredShops;
        user.save();
    }).then((result)=>{
        console.log('Updated user successfully');
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;