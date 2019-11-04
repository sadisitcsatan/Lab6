var express = require('express');
var router = express.Router();

router.get('/lab8', function (req,res,next) {
    res.render('lab8/index.html');
});
router.post('/lab8', function (req,res,next) {
   console.log(req.body);
});
module.exports = router;