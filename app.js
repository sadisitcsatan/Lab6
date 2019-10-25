const express = require("express");
const app = express();
app.engine('html',require('ejs').renderFile);
app.use(express.static("public"));
//routes
app.get("/", function (req,res,next) {
    res.render("index.html");
});
app.get("/mercury", function (req,res,next) {
   res.render("mercury.html");
});
app.get("/venus", function (req,res,next) {
    res.render("venus.html");
});
app.get("/earth", function (req,res,next) {
    res.render("earth.html");
});
app.get('/mars',function (req,res,next) {
   res.render("mars.html");
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
app.listen(process.env.PORT,process.env.IP,function () {
   console.log("Running Express Server");
});