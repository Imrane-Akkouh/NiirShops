const express = require('express');

let router = express.Router();

let User = require('../models/user.model.js');

router.post('/', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let preferredShops = req.body.preferredShops;
    let user = new User({
        username: username,
        password: password,
        preferredShops: preferredShops
    })
    user.save((err, doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log(`Could not create a user:  ${JSON.stringify(err, undefined, 2)}`);
        }
    })
});

router.get('/login', (req,res)=>{
    User.find({'username': req.body.username, 'password': req.body.password}, (err,doc)=>{
        if(doc.length==0){
            console.log("Could not find a matching user");
            return res.status(404).send();
        }

        if(err){
            console.log(err);
            return res.status(500).send();
        }
        res.send(doc);
    })
})

router.put('/:username', (req,res)=>{
    let preferredShops = req.body.preferredShops;
    User.findById(req.body._id).then(user=>{
        user.preferredShops = preferredShops;
        user.save();
    }).then((result)=>{
        console.log('Updated user successfully');
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;