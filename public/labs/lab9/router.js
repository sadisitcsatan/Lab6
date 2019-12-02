const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.post('/quotes',function (req,res,next) {
    const nameFilt = req.body.author;
    console.log(req.body);
    console.log(req.body.author);
    console.log(nameFilt);
    var change = nameFilt.split(" ");
    const first = change[0];
    //console.log(change);
    //console.log(req.body);
    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ux0er26era80bb09',
        password: 'xn9oqgy1x6zuloe5',
        database: 'xrcczq694g92zyim'
    });
    connection.connect();
    console.log(first);
    connection.query(`
SELECT a.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_author a 
WHERE a.firstName LIKE '${first}'
`, function(error, results, fields) {
        console.log(results);
        res.json({
            info: results
        })
    });
    connection.end();
});


router.get('/quotes', function(req, res, next) {
    // Host	d5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
    // Username	ux0er26era80bb09
    // Password	xn9oqgy1x6zuloe5
    // Port	3306
    // Database	xrcczq694g92zyim
    const nameFilt = req.query.name;
    var change = nameFilt.split(" ");
    const first = change[0];
    //console.log(change);
    //console.log(req.body);
    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ux0er26era80bb09',
        password: 'xn9oqgy1x6zuloe5',
        database: 'xrcczq694g92zyim'
    });
    connection.connect();
    //console.log(first);
    connection.query(`
SELECT a.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_author a 
WHERE a.firstName LIKE '${first}'
`, function(error, results, fields) {
        console.log(req.query.name);
        res.render('../public/labs/lab9/view.hbs',{
            info: results,
            fullName: first
        });
    });
    connection.end();

});

/* GET users listing. (/mysql) */
router.get('/', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ux0er26era80bb09',
        password: 'xn9oqgy1x6zuloe5',
        database: 'xrcczq694g92zyim'
    });

    connection.connect();

    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
`, function(error, results, fields) {
        if (error) throw error;
        //console.log('The quotes are: ', results);

        res.render('../public/labs/lab9/index.hbs', {
            title: 'Search quotes',
            quotes: results
        });
    });

    connection.end();

});
router.post('/categories',function (req,res,next) {
    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ux0er26era80bb09',
        password: 'xn9oqgy1x6zuloe5',
        database: 'xrcczq694g92zyim'
    });

    connection.connect();
    connection.query(`
SELECT DISTINCT q.category FROM l9_quotes q
`, function(error, results, fields) {
        if (error) throw error;
        res.json({
            info:results
        })
    });
    connection.end();
});
router.post('/', function (req,res,next) {
    //console.log("TEST");
    //console.log(req.body);
    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ux0er26era80bb09',
        password: 'xn9oqgy1x6zuloe5',
        database: 'xrcczq694g92zyim'
    });

    connection.connect();
    if (req.body.keyword){
        let keyW = req.body.keyword;
        connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId WHERE q.quote LIKE '%${keyW}%'
`, function(error, results, fields) {
            if (error) throw error;
            res.json({
                info:results
            })
        });
    }
    if (req.body.first){
    let firstN = req.body.first;
    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId WHERE a.firstName LIKE '%${firstN}%'
`, function(error, results, fields) {
        if (error) throw error;
        res.json({
            info:results
        })
    });
    }
    if (req.body.last){
        let lastN = req.body.last;
        connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId WHERE a.lastName LIKE '%${lastN}%'
`, function(error, results, fields) {
            if (error) throw error;
            res.json({
                info:results
            })
        });
    }
    if (req.body.gender){
        const gender = req.body.gender;
        connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId WHERE a.sex LIKE '${gender}'
`, function(error, results, fields) {
            if (error) throw error;
            res.json({
                info:results
            })
        });
    }
    if (req.body.Category){
        const cate = req.body.Category;
        connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender', a.firstName AS 'firstName'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId WHERE q.category LIKE '%${cate}%' 
`, function(error, results, fields) {
            if (error) throw error;
            res.json({
                info:results
            })
        });
    }
    connection.end();
});

module.exports = router;