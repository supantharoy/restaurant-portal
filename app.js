const path = require("path");

const express = require("express");

// The below functionality is also called importing

// resData has been moved to routes/restaurants.js

// const resData = require('./util/restaurant-data');
// ./restaurant-data means restaurant-data.js is a sibling file of app.js, but here it is not 
// ./util/restaurant-data means that this path is relative from app.js
// In require we use ./

const defaultRoutes = require('./routes/default')
const restaurantsRoutes = require('./routes/restaurants')

// We import routes from default.js using middleware. For that, first we need to import these routes using require

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
// In case of app.get('/'), if the route contained only / then the request would be handled, however in case of app.use('/'), it acts like a filter, so any request that starts with / (so bascally any request) will be handled by the middleware

// So, our incoming request will be forwarded to default.js and if none of the routes in default.js match the request then the request will come back to app.js


app.use('/', restaurantsRoutes);
// If we do app.use('/restaurants', restaurantsRoutes) then the two paths will be combined, so in restaurants.js only routes that have /restaurants/restaurants or /restaurants/recommend will get activated


// The below code has been outsourced to routes/restaurants.js file

// app.get("/restaurants", function (req, res) {
//   res.render("restaurants", {
//     numberOfRestaurants: storedRestaurants.length,
//     restaurants: storedRestaurants,
//   });
// });

// // We need a dynamic route as we need a unique route for every restaurant
// // We can define dynamic routes using /: Then after : we give the dynamic placeholder, here id.
// app.get("/restaurants/:id", (req, res) => {
//   // restaurants/r1

//   // params contains an object and that object will have any dynamic placeholders that we define in the path as properties (as keys)
//   const restaurantId = req.params.id;
//   // id is from the route /:id

//   for (const restaurant of storedRestaurants) {
//     if (restaurant.id === restaurantId) {
//       return res.render("restaurant-detail", { restaurant: restaurant });
//       // We use return here to stop the function execution after res.render() is executed
//     }
//   }

//   res.status(404).render("404.ejs");
//   // status() allows us to set a custom status code and the default would be 200, here we are passing 404 to set the status code in developer tools to 404, so that we are technically correct
// });

// app.get("/recommend", function (req, res) {
//   res.render("recommend");
// });

// app.post("/recommend", function (req, res) {
//   const restaurant = req.body;
//   restaurant.id = uuid.v4();
//   // As id is not present in restaurant object, when we try to access restaurant.id, we create a new property in the restaurant object

//   storedRestaurants.push(restaurant);

//   // fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

//   resData.storeRestaurants(storedRestaurants);

//   res.redirect("/confirm");
// });

// app.get("/confirm", function (req, res) {
//   res.render("confirm");
// });


app.use((req, res) => {
  res.status(404).render('404.ejs');
});

// We can add filter in the first argument, like app.use('/admin') would mean that only requests that start with /admin and other requests would be ignored

// The above middleware function would work like any other app.get() function, so we can render our 404 error page if the route is not defined.

app.use((error, req, res, next) => {
  res.status(500).render('500.ejs');
});
// For 500 internal server error, the above middleware function must receive four parameters because that signals to Express that this is the special default error handler middleware function that should be invoked by Express if some error occurs anywhere in our Express Application

// The first parameter, error object, is generated and populated automatically by Express. It contains more information about the error that occured

// The last parameter, next, allows us to have multiple middlewares that will work together and when we call next inside of a middleware, it allows the request to move on to the next middleware or route handler in line


app.listen(3000);
