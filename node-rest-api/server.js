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
      //   if (result.length == 0) res.send("false");
      //   else res.send("true");
      res.send(result);
    });
  });
});

// ADMIN DASHBOARD
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

app.get("/homepage", function (req, res) {
  var query = "SELECT * FROM products";

  con.connect(function (err) {
    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

// NOT WORKING
app.get("/:userId", function (req, res) {
  var userId = req.params.userId;
  var query = 'SELECT * FROM customers WHERE userId = "' + userId + '"';

  con.connect(function (err) {
    if (err) throw err;
    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});
// Customer Dashboard
// This will receive userId as body
// app.get("/userhomepage", function (req, res) {
//   var userId = req.body.userId;
//   var query = 'SELECT * FROM customer where userId ="' + userId + '"';

//   con.connect(function (err) {
//     if (err) throw err;

//     con.query(query, function (req, result) {
//       res.send(result);
//     });
//   });
// });

app.listen(port, () => {
  console.log("Server is running");
});
