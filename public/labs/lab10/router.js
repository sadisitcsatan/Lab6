const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/logout', function (req,res,next) {
    if (req.session && req.session.username && req.session.username.length){
        delete req.session.username;
        res.render('../public/labs/lab10/login.hbs');
    }else{
        res.json({
           'successful': false,
           'message': ""
        });
    }
});
router.get('/login', function (req,res,next) {
   res.render("../public/labs/lab10/login.hbs");
});
router.post('/login',function (req,res,next) {
   console.log(req.body);
   let successful = false;
   let message = '';
   if (req.body.username === 'admin' && req.body.password === 'password'){
       successful = true;
       req.session.username = req.body.username;
   }else {
       delete req.session.username;
       message = "Wrong username or password";
   }
   console.log(req.session.username);
   res.json({
      'successful': successful,
      "message": message
   });
});
router.get('/',function (req,res,next) {
    if (req.session && req.session.username && req.session.username.length) {
        const connection = mysql.createConnection({
            host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ux0er26era80bb09',
            password: 'xn9oqgy1x6zuloe5',
            database: 'xrcczq694g92zyim'
        });

        connection.connect();

        connection.query(`
SELECT *, CONCAT(l9_author.firstName, ' ', l9_author.lastName) AS 'fullName'
FROM l9_author
`, function (error, results, fields) {
            console.log(results);
            if (error) throw error;
            //console.log('The quotes are: ', results);

            res.render('../public/labs/lab10/index.hbs', {
                title: 'Search quotes',
                quotes: results
            });
        });

        connection.end();
    }else{
        res.render('../public/labs/lab9/index.hbs');
    }
});
router.get('/quotes/add', (req, res) => {
    if (req.session && req.session.username && req.session.username.length) {
        if (!(Object.keys(req.query).length === 0)) {
            //console.log(req.query.firstname);
            //console.log(req.query);
            if (req.query.dod) {
                var dod = req.query.dod;
                dod = new Date(dod);
                dod = dod.toISOString().substr(0, 10);
            } else {
                var dod = "";
            }
            //console.log(dod);
            if (req.body.dob) {
                var dob = req.query.dob;
                dob = new Date(dob).toISOString().substr(0, 10);
            } else {
                var dob = "";
            }
            res.render('../public/labs/lab10/view.hbs', {
                title: 'Change',
                firstName: req.query.firstname,
                lastName: req.query.lastname,
                dob: dob,
                dod: dod,
                id: req.query.id
            });
        } else {
            res.render('../public/labs/lab10/view.hbs');
        }
    }else {
        res.render('../public/labs/lab9/index.hbs');
    }
});

router.post('/quotes/add', function(req, res, next) {
    if (req.session && req.session.username && req.session.username.length) {
        // Get a query string value for filter
        console.log(req.body);
        console.log(req.query);
        var dob = req.body.dob;
        var dod = req.body.dod;
        if (!dob) {
            dob = null;
        }
        if (!dod) {
            dod = null;
        }
        const connection = mysql.createConnection({
            host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ux0er26era80bb09',
            password: 'xn9oqgy1x6zuloe5',
            database: 'xrcczq694g92zyim'
        });

        connection.connect();
        if (!req.body.authorId) {
            connection.query(
                'INSERT INTO l9_author(firstName, lastName, dob, dod, sex) VALUES (?, ?, ?, ?, ?)',
                [req.body.firstName, req.body.lastName, dob, dod, req.body.gender], // assuming POST
                (error, results, fields) => {
                    if (error) throw error;
                    res.json({
                        id: results.insertId
                    });
                });
        } else {
            const authorId = req.body.authorId;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            connection.query(
                `UPDATE l9_author SET firstName='${firstName}', lastName='${lastName}', dob='${dob}', dod='${dod}'' +
        'WHERE authorId='${authorId}'`,
                (error, results, fields) => {
                    if (error) throw error;
                    res.json({
                        id: results.insertId
                    });
                });
        }

        connection.end();
    }else {
        res.render('../public/labs/lab9/index.hbs');
    }

});
router.get('/delete', function(req,res,next){
    if(req.session && req.session.username && req.session.username.length) {
        console.log(req.query);
        res.render('../public/labs/lab10/confirmation.hbs', {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            id: req.query.id
        });
    }else {
        res.render('../public/labs/lab9/index.hbs');
    }
});
router.post('/delete', function (req,res,next) {
    if (req.session && req.session.username && req.session.username.length) {
        console.log(req.body);
        const connection = mysql.createConnection({
            host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ux0er26era80bb09',
            password: 'xn9oqgy1x6zuloe5',
            database: 'xrcczq694g92zyim'
        });
        connection.query(`
DELETE FROM l9_author WHERE authorId='${req.body.authorId}'
`, function (error, results, fields) {
            console.log(results);
            if (error) throw error;

        });
        connection.end();
        res.json({
            "result": "Success"
        });
    }else{
        res.render('../public/labs/lab9/index.hbs');
    }
});

module.exports = router;