var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser")
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

var params = require("./params/params");
var setUpPassport = require("./setuppassport");

var app = express();

mongoose.connect(params.DATABASECONNECTION);

setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
   secret:'dfejiry239r8edfh$vk*&sdvnkmkd',
   resave:false,
   saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"),function() {
   console.log("Server started on port " + app.get("port"));
});