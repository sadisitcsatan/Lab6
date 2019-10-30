const express = require("express");
const app = express();
const test = require("all-the-package-names");
console.log(test);
var project4Router = require('./routes/proj4');
app.engine('html',require('ejs').renderFile);
app.use(express.static("public"));
//routes
app.use('/proj4', project4Router);

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