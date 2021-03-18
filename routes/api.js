const express = require('express');
const router = express.Router();
const signup = require('./signup');
const login = require('./login');
const account = require('./account')
const error404 = require("./404");
const error500 = require("./500");


router.get('/', function (req, res){
    res.redirect('/login');
});
router.use('/signup', signup);
router.use('/login', login);
router.use("/account",account);
router.use(error500);
router.use(error404);


module.exports = router;