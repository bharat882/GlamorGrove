var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
// Parsing Form data
var bodyParser = require("body-parser"); //Body Parse middleware to parse form data
var multer = require("multer"); //Middleware for handling form data
var login = multer();
app.use(login.array());
app.use(bodyParser.json());

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

con.connect(function (err) {
  if (err) throw err;

  // Authenticate User request
  app.post("/login", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    //console.log(password);

    // PERFORM JOIN

    var query =
      'SELECT customer.userId, customer.user_type FROM credentials INNER JOIN customer ON credentials.userId = customer.userId WHERE userName = "' +
      username +
      '" AND password = "' +
      password +
      '"';

    /* var query =
      'SELECT * FROM credentials, customer WHERE userName = "' +
      username +
      '" AND password = "' +
      password +
      '" AND credentials.userId = customer.userId';
*/
    console.log(query);
    con.query(query, function (err, result) {
      if (err) throw err;

      console.log(result);
      if (result.length == 0) res.send("false");
      res.send(result);
    });
  });

  // Update user Credetials request
  app.put("/user", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
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

    if (err) throw err;
    con.query(query, function (err, result) {
      res.send(result);
    });
  });

  // ADMIN Homepage
  app.get("/adminhomepage", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    var query = "SELECT * FROM credentials";

    con.query(query, function (err, result) {
      res.send(result);
    });
  });

  // User Details
  app.get("/user", function (req, res) {
    // console.log(req.query.userId);
    var userId = req.query.userId;
    var query = 'SELECT * FROM customer where userId = "' + userId + '"';

    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/products", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var query = "SELECT * FROM products";

    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.delete("/user", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var userId = req.query.userId;

    var query =
      "DELETE cust, cred FROM customer cust LEFT JOIN credentials cred ON cust.userId = cred.userId WHERE cust.userId = " +
      userId;

    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log("Server is running");
  });
});
