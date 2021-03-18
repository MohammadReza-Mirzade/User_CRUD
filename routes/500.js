module.exports = function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('pages/500');
};