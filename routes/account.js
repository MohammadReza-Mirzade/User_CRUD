const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use("/:user", function (req, res, next){
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf8', function (err, data) {
        let user = JSON.parse(data).find(function (element) {
            return element.user === req.params['user'];
        });
        if (!user){
            return res.render('pages/404');
        }else {
            if (user.isLoggedIn) {
                next();
            } else {
                return res.render('pages/haventPermission');
            }
        }
    });
});

router.get('/:user/logout', function (req, res){
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf8', function (err, data) {
        let data1 = JSON.parse(data);
        let userIndex = data1.findIndex(function (element) {
            return element.user === req.params['user'];
        });
        let user = data1[userIndex];
        data1.splice(userIndex,1);
        user.isLoggedIn = false;
        data1.push(user);
        fs.writeFile(path.join(__dirname, "../db/users.json"), JSON.stringify(data1), function (err){
            if (err) return console.log(err);
        });
        res.redirect("/login");
    });
});

router.get('/:user', function (req, res){
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf8', function (err, data) {
        let user = JSON.parse(data).find(function (element) {
            return element.user === req.params['user'];
        });
        res.render('pages/account', {user: user.user, email: user.email, password: user.password});
    });
});

router.post('/:user', function (req, res) {
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf8', function (err, data) {
        let data1 = JSON.parse(data);
        let userIndex = data1.findIndex(function (element) {
            return element.user === req.params['user'];
        });
        let user = data1[userIndex];
        if (user.password === req.body.passwordL.trim()) {
            data1.splice(userIndex, 1);
            user.password = req.body.password;
            user.email = req.body.email;
            data1.push(user);
            fs.writeFile(path.join(__dirname, "../db/users.json"), JSON.stringify(data1), function (err) {
                if (err) return console.log(err);
            });
            res.send("");
        } else {
            res.send("password");
        }
    });
});

router.get

module.exports = router;
