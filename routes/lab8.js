var express = require('express');
var router = express.Router();

router.get('/lab8', function (req,res,next) {
    res.render('lab8/index.html');
});
router.post('/lab8', function (req,res,next) {
   console.log(req.body);
   res.json({
       original: req.body,
       test: req.body,
       questions: {
           "1": "sacramento",
           "2": "mo",
           "3": ["Jefferson", "Roosevelt"],
           "4": "Rhode Island",
           "5": "seal2",
           "6": "50",
           "7": "13",
           "8": ["Red", "White", "Blue"]
       }
   });
});
module.exports = router;