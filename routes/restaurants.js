// Outsourceing routes in different files

const express = require("express");
const uuid = require("uuid");
// uuid is required to generate a unique id

const resData = require("../util/restaurant-data");

const router = express.Router();

const storedRestaurants = resData.getStoredRestaurants();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  // We can access the query parameters in the URL using req.query. Here, we are checking if there is an order key in the query object

  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") order = "asc";

  if(order === "desc")
    nextOrder = "asc";

  storedRestaurants.sort((resA, resB) => {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resA.name < resB.name)
    )
      return 1;
    // If a return a value greater than 0, then the two values will be swapped

    return -1;
    // If we return a value less than 0, then the two items will not be swapped
  });

  // sort() method can sort array of numbers without any issues, but for complex data like in this case an array of objects, we need to pass a function to sort that will be executed for every restaurant and which then will return 1 or -1 depending on whether should two stored restaurants change their order or not

  // The function inside sort will receive two parameters which will be compared

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404.ejs");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  storedRestaurants.push(restaurant);

  resData.storeRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
