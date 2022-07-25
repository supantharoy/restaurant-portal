
// Outsourceing routes in different files

const express = require('express');

const router = express.Router();

// The app object is not available in this file.
// We do not wish to create another one using const app = express() as we only want to have such an express app created only once in our application and that should be in our main app file

// The router object is very similar to app object and also has get and post method

// After creating router we replace app with router

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

// To use these routers in app.js, we will again use module.exports

module.exports = router;