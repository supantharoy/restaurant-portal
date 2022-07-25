const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '..', "data", "restaurants.json");
// '..' indicates that we want to go one level up in our directory

const getStoredRestaurants = () => {

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
};

const storeRestaurants = (storeableRestaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(storeableRestaurants));

}

// We need to use module.exports as the variables, constants and methods are not usable in other functions by default
module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    // The second getStoredRestaurants is the function above in this file. The first getStoredRestaurants is the name by which this function can be used in other files.
    // We don't add () in the getStoredRestaurants above as we do not wish to execute it immediately.

    storeRestaurants: storeRestaurants
};