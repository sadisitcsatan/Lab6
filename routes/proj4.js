var express = require('express');
var router = express.Router();
var faker = require('faker');
const faked = faker.name.findName();
router.get('/', function (req,res,next) {
    res.render('project4/Flex.html',{
        Title: faked
    });
});
router.get('/syntax',function (req,res,next) {
    res.render("project4/Topic1.html",{
        Title: faked
    });
});
router.get('/current',function (req,res,next) {
    res.render("project4/Topic2.html",{
        Title: faked
    });
});
router.get('/versions',function (req,res,next) {
    res.render("project4/Topic3.html",{
        Title: faked
    });
});
module.exports = router;