const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res){
    res.render('pages/login');
});


router.post("/", function (req, res){
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf8', function (err, data){
        let data1 = JSON.parse(data);
        let userIndex = data1.findIndex(function (element){
            return element.user === req.body.user;
        });
        let user = data1[userIndex];
        if (!user){
            res.send("user");
        } else {
            if (req.body.password === user.password) {
                console.log(data1);
                console.log(userIndex);
                data1.pop(userIndex);
                user.isLoggedIn = true;
                data1.push(user);
                console.log(user);
                console.log(data1)
                fs.writeFile(path.join(__dirname, "../db/users.json"), JSON.stringify(data1), function (err){
                    if (err) return console.log(err);
                });
                res.send("/account/"+JSON.parse(data)[userIndex].user);
            } else {
                res.send("password");
            }
        }
    });
});

module.exports = router;