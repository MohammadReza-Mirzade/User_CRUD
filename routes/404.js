const express = require('express');
const router = express.Router();
const error = require("./500")

router.use(error);

router.use("/", function (req, res){
    res.status(404);
    res.format({
        html: function () {
            res.render('./pages/404');
        },
        json: function () {
            res.json({ error: 'Not found' });
        },
        default: function () {
            res.type('txt').send('Not found');
        }
    })
});

module.exports = router;