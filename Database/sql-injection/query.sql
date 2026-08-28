/*
	Select the brand, model and price from cars
	Use a parameter value of $1
	Pass the user input in index.js
*/

SELECT brand, model, price FROM cars
  WHERE brand = $1;