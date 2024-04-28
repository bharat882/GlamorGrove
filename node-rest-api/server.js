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
    var userId = req.body.userId;

    var query =
      'Update credentials SET Username = "' +
      username +
      '" ,Password = "' +
      password +
      '" WHERE userId = "' +
      userId +
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

    console.log(query);
    con.query(query, function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
  });

  app.get("/product", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var id = req.query.product_id;
    var query = "SELECT * FROM `products` WHERE product_id = " + id;
    con.query(query, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.delete("/product", function (req, res) {
    console.log("DELETE product request");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var id = req.query.id;
    console.log(req.body);

    var query = "DELETE FROM `products` WHERE `products`.`product_id` = " + id;
    console.log(query);
    con.query(query, function (err, result) {
      console.log(result);
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

  app.put("/product", function (req, res) {
    console.log("PUT product request!");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var product_id = req.body.product_id;
    var product_name = req.body.product_name;
    var description = req.body.description;
    var image_url = req.body.image_url;
    var category_id = req.body.category_id;
    var price = req.body.price;
    var sku = req.body.sku;
    var units_in_stock = req.body.units_in_stock;
    var active = req.body.active;
    var featured = req.body.featured;
    var last_updated = new Date().toISOString().slice(0, 19).replace("T", " ");
    var query =
      "UPDATE `products` SET `product_name` = '" +
      product_name +
      "', `description` = '" +
      description +
      "', `image_url` = '" +
      image_url +
      "', `category_id` = " +
      category_id +
      ", `price` = " +
      price +
      ", `sku` = '" +
      sku +
      "', `units_in_stock` = " + // Added missing comma and single quotes
      units_in_stock +
      ", `active` = " +
      active +
      ", `featured` = " +
      featured +
      ", `last_updated` = '" +
      last_updated +
      "' WHERE `product_id` = " +
      product_id;

    console.log(query);
    con.query(query, function (err, result) {
      console.log(result);
      res.send(result);
    });
  });

  //
  app.post("/product", function (req, res) {
    console.log("Post request");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    var product_name = req.body.product_name;
    var description = req.body.description;
    var image_url = req.body.image_url;
    var category_id = req.body.category_id;
    var price = req.body.price;
    var sku = req.body.sku;
    var units_in_stock = req.body.units_in_stock;
    var active = req.body.active;
    var featured = req.body.featured;
    var creation_date = new Date().toISOString().slice(0, 19).replace("T", " ");
    var last_updated = new Date().toISOString().slice(0, 19).replace("T", " ");

    console.log("Product Name:", req.body.product_name);
    console.log("Description:", req.body.description);
    console.log("Image URL:", req.body.image_url);
    console.log("Category ID:", req.body.category_id);
    console.log("Price:", req.body.price);
    console.log("SKU:", req.body.sku);
    console.log("Units in Stock:", req.body.units_in_stock);
    console.log("Active:", req.body.active);
    console.log("Featured:", req.body.featured);

    var query =
      "INSERT INTO `products` (`product_name`, `description`, `image_url`, `category_id`, `price`, `sku`, `units_in_stock`, `active`, `featured`, `creation_date`, `last_updated`) VALUES ('" +
      product_name +
      "', '" +
      description +
      "', '" +
      image_url +
      "', " +
      category_id +
      ", " +
      price +
      ", '" +
      sku +
      "', " +
      units_in_stock +
      ", " + // Added the missing comma
      active +
      ", " +
      featured +
      ", '" +
      creation_date +
      "', '" +
      last_updated +
      "')";

    //  console.log(query);

    con.query(query, function (err, result) {
      console.log(res);
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log("Server is running");
  });
});
