var express = require("express");
var app = express();

// Parsing Form data
var bodyParser = require("body-parser"); //Body Parse middleware to parse form data
var multer = require("multer"); //Middleware for handling form data
var login = multer();
app.use(login.array());

const port = 3000;

// SQL CONNECTION
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "angular-springboot-project",
});

//

// Authenticate User request
app.get("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var query =
    'SELECT * FROM credentials WHERE userName = "' +
    username +
    '" AND password = "' +
    password +
    '"';

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");

    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

// Update user Credetials request
app.put("/user", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var recordId = req.body.recordId;

  var query =
    'Update credentials SET Username = "' +
    username +
    '" ,Password = "' +
    password +
    '" WHERE RecordId = "' +
    recordId +
    '"';

  console.log(query);

  con.connect(function (err) {
    if (err) throw err;
    con.query(query, function (err, result) {
      res.send(result);
    });
  });
});

// ADMIN Homepage
app.get("/adminhomepage", function (req, res) {
  var query = "SELECT * FROM credentials";

  con.connect(function (err) {
    if (err) throw err;

    con.query(query, function (err, result) {
      res.send(result);
    });
  });
});

// User Details
app.get("/user", function (req, res) {
  var userId = req.body.userId;
  var query = 'SELECT * FROM customer where userId = "' + userId + '"';

  con.connect(function (err) {
    if (err) throw err;
    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get("/products", function (req, res) {
  var query = "SELECT * FROM products";

  con.connect(function (err) {
    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(port, () => {
  console.log("Server is running");
});
