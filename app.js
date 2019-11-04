const express = require("express");
const app = express();
const request = require('request');

var project4Router = require('./routes/proj4');

app.set("view engine", "ejs");
app.engine('html',require('ejs').renderFile);
app.use(express.static("public"));
//routes
app.use('/proj4', project4Router);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/lab7',function (req,res,next) {
    res.render("lab7/index.html",{
        image: ""
        }
    );
});
app.post("/lab7", async function (req,res,next) {
    //console.log(req.query.q, req.query.orientatio);
    //console.log(req.body);
    //console.log(req.body[0]);
    console.log(req.body.keyword);
    let keyword = req.body.keyword; //gets the value that the user typed in the form using the GET method

    let parsedData = await getImages(keyword);
    console.log(parsedData.hits.length);

    res.json( {parsedData});
    // res.json(
    //     {
    //         original: req.body
    //     }
    //);
    //getImages(req.query.q,req.query.orientatio);
});
app.get("/", function (req,res,next) {
    res.render("lab6/index.html");
});
app.get("/mercury", function (req,res,next) {
   res.render("lab6/mercury.html");
});
app.get("/venus", function (req,res,next) {
    res.render("lab6/venus.html");
});
app.get("/earth", function (req,res,next) {
    res.render("lab6/earth.html");
});
app.get('/mars',function (req,res,next) {
   res.render("lab6/mars.html");
});
function getImages(keyword,orientatio) {
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword+ '&orientation='+orientatio,
            function (error, response, body) {

                if (!error && response.statusCode == 200  ) { //no issues in the request

                    let parsedData = JSON.parse(body); //converts string to JSON

                    resolve(parsedData);

                    //
                    //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                    //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});

                } else {
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }

            });//request

    });
}
//server listener
//process.env.PORT,process.env.IP
//"8081","localhost"
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
var port = normalizePort(process.env.PORT || '8081');
app.listen(port,process.env.IP,function () {
   console.log("Running Express Server");
});