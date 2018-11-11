var router = require('express').Router();



router.get('/', function (req, res) {
    res.render('index');
    // res.end();//for ending the response
});

module.exports = router;
