const express = require('express');
const router = express.Router();
const mysql = require('mysql');
router.get('/',function (req,res,next) {
    res.render('Lab6/public/auth/dashboard.hbs',{
       title: "Logged in Dashboard"
    });
});
router.get('/login', (req, res) => {

    res.render('Lab6/public/auth/login.hbs', {
        title: 'Login'
    });

});

module.exports = router;