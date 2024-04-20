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
    // console.log(query);
    con.query(query, function (err, result) {
      if (err) throw err;

      //   console.log(result);
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

    var category_id = req.query.category_id;
    var query =
      'SELECT * FROM products WHERE category_id ="' + category_id + '"';

    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/product", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var id = req.query.id;
    var query = "SELECT * FROM `products` WHERE id = " + id;
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
    console.log(query);
    con.query(query, function (err, result) {
      if (err) throw err;

      res.send(result);
    });
  });

  app.get("/categories", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var query = "SELECT * FROM category";
    console.log(query);
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

  app.delete("/product", function (req, res) {
    console.log("DELETE product request");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var id = req.body.id;
    console.log(id);

    var query = "DELETE FROM `products` WHERE `products`.`id` = " + id;
    con.query(query, function (err, result) {
      res.send(result);
    });
  });

  app.put("/product", function (req, res) {
    console.log("PUT product request!");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var id = req.body.id;
    var title = req.body.title;
    var image = req.body.image;
    var category_id = req.body.category_id;

    console.log(category_id);
    var query =
      "UPDATE `products` SET `Title` = '" +
      title +
      "', `image` = '" +
      image +
      "', `category_id` = " +
      category_id +
      " WHERE `products`.`id` = " +
      id;

    console.log(query);
    con.query(query, function (err, result) {
      console.log(result);
      res.send(result);
    });
  });

  //
  app.post("/product", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    /* var sku = req.body.sku;
    var name = req.body.sku;
    var description = req.body.description;
    var unit_price = req.body.unit_price;
    var image_url = req.body.image_url;
    var active = req.body.active;
    var units_in_stock = req.body.units_in_stock;
    var category_id = req.body.category_id;
    */
    var id = req.body.id;
    var Title = req.body.Title;
    var image = req.body.image;
    var category_id = req.body.category_id;

    var query =
      "INSERT INTO `products` (`id`, `Title`, `image`, `category_id`) VALUES (NULL, '" +
      Title +
      "', '" +
      image +
      "', '" +
      category_id +
      "')";

    console.log(query);

    con.query(query, [Title, image, category_id], function (err, result) {
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log("Server is running");
  });
});
