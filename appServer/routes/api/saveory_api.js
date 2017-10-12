var NODE_ENV = process.env.NODE_ENV;
var express = require('express');
var request = require('request');
var router = express.Router();
var apiRoutes = {
	pantry: "http://pantry-service:9080/Pantry",
	recipes: "http://recipeservice:9080/RecipeService",
	user: "http://usermanagement-service:9080/UserManagement"
};
var DEV_RESP = {
	pantry: {
			data: JSON.stringify(
				{
					user: "59bae6bc46e0fb00012e87b5",
					pantry: [
						{ingredient: "steak", quantity: 1000000, unit: "oz", expiration: "2017-09-28", location: "Refrigerator"},
						{ingredient: "chicken", quantity: 4, unit: "lbs", expiration: "2017-10-27", location: "Refrigerator"},
						{ingredient: "light brown sugar", quantity: 28, unit: "tsp", expiration: "2020-02-05", location: "Pantry"},
						{ingredient: "Butter", quantity: 3, unit: "cup", expiration: "2017-10-21", location: "Refrigerator"},
						{ingredient: "vegetable oil", quantity: 5, unit: "cup", expiration: "2018-06-13", location: "Pantry"},
						{ingredient: "Orange", quantity: 2, unit: "piece", expiration: "2017-10-20", location: "Pantry"},
						{ingredient: "masala", quantity: 5, unit: "cup", expiration: "2038-07-08", location: "Pantry"},
						{ingredient: "cayenne pepper", quantity: 2, unit: "cup", expiration: "2017-09-26", location: "Pantry"}
					],
					_id: "59baf1685b7aa700019b9c58"
				}
			),
			specIngredient: [
			    "ingredient",
			    "quantity",
			    "unit",
			    "expiration",
			    "location"
			],
			specIngredientTypes: [
			    "text",
			    "number",
			    "text",
			    "date",
			    {
			        "dropdown": "text"
			    }
			],
			specIngredientEdits: [
			    false,
			    true,
			    true,
			    true,
			    true
			],
			specIngredientLocation: [
			    "Pantry",
			    "Refrigerator"
			]
		}
	},
	recipes: JSON.stringify([ { "_id" : { "$oid" : "598b67330e8682c5920d1ed3"} , "name" : "Cereal and Milk" , "id" : "1" , "author" : "Bob Saget" , "tag" : [ "dairy" , "vegetarian"] , "description" : "The simplest breakfast you'll ever make" , "instructions" : "Step 1: Pour cereal in bowl; Step 2: Pour milk in bowl" , "ingredients" : [ { "name" : "Cereal" , "tag" : "null" , "description" : "Kellog's Brand" , "quantity" : "1" , "unit" : "cup" , "has" : "0"} , { "name" : "Milk" , "tag" : "dairy" , "description" : "Kellog's Brand" , "quantity" : "0.5" , "unit" : "cup" , "has" : "0"}]} , { "_id" : { "$oid" : "598b77db0e8682c5920d1edb"} , "name" : "ACP" , "id" : "2" , "author" : "Bob Tortor" , "tag" : [ "latin"] , "description" : "A rice and chicken meal" , "instructions" : "Step 1: Prepare the rice with salt and oil and let it heat; Step 2: Prepare the chicken and put it in warm oil" , "ingredients" : [ { "name" : "Rice" , "tag" : [ ] , "description" : "Goya" , "quantity" : "2" , "unit" : "cup" , "has" : "0"} , { "name" : "Chicken" , "tag" : [ ] , "description" : "Great Value" , "quantity" : "6" , "unit" : "oz" , "has" : "0"} , { "name" : "Salt" , "tag" : [ ] , "description" : "w. Iodine" , "quantity" : "4" , "unit" : "tbsps" , "has" : "0"} , { "name" : "Oil" , "tag" : [ ] , "description" : "Great Value" , "quantity" : "2" , "unit" : "tbsps" , "has" : "0"}]} , { "_id" : { "$oid" : "5995b25872f1d615c1a2efcb"} , "name" : "CAP" , "id" : "3" , "author" : "Bob Tortor" , "tag" : [ "latin"] , "description" : "A rice and chicken meal" , "instructions" : "Step 1: Prepare the rice with salt and oil and let it heat; Step 2: Prepare the chicken and put it in warm oil" , "ingredients" : [ { "name" : "Rice" , "tag" : [ ] , "description" : "Goya" , "quantity" : "2" , "unit" : "cup" , "has" : "0"} , { "name" : "Chicken" , "tag" : [ ] , "description" : "Great Value" , "quantity" : "6" , "unit" : "oz" , "has" : "0"} , { "name" : "Salt" , "tag" : [ ] , "description" : "w. Iodine" , "quantity" : "4" , "unit" : "tbsps" , "has" : "0"} , { "name" : "Oil" , "tag" : [ ] , "description" : "Great Value" , "quantity" : "2" , "unit" : "tbsps" , "has" : "0"}]} , { "_id" : { "$oid" : "59bc42473488bc2693765301"} , "name" : "Masala Steak" , "id" : "4" , "author" : "Gordon Ramsey" , "tag" : [ "fried" , "beef"] , "description" : "Slow-Roasted, Twice-Fried Porterhouse Steak" , "instructions" : "Step 1: Score steak Â¼\" deep over all surfaces in a crosshatch pattern, making cuts 1\" apart (this helps the seasoning penetrate). <br/>Step 2: Mix salt, brown sugar, and cayenne in a small bowl and rub all over steak, massaging into score marks and crevices. <br/>Step 3: Upend steak on the flat side of the bone on a wire rack set inside a rimmed baking sheet and chill overnight (or a solid 12 hours). This will dry out the meat and intensify the flavor of the rub. <br/>Step 4: Then freeze (still upright) until solid, at least 6 hours and up to 24 hours. <br/>Step 5: Preheat oven to 200Â°. Pour rice bran oil or vegetable oil into a 12\" skillet, preferably cast iron, to a depth of Â¾\". Oil should be deep enough to come halfway up side of steak; add a little more oil to skillet if needed. <br/>Step 6: Heat oil over medium-high until probe thermometer registers 350Â° (or clip a deep-fry thermometer to the side of your skillet if you prefer). Transfer steak straight from freezer to skillet and cook, turning once, until deeply browned all over and a crisp crust has formed, about 3 minutes per side. <br/>Step 7: Transfer steak back to rack on baking sheet (reserve skillet and oil) and roast in oven until no longer frozen (the interior will still be cold but thawed enough to allow the insertion of the probe thermometer), 30â€“35 minutes. <br/>Step 8: Meanwhile, cook butter in a small saucepan over medium heat until it foams, then browns, 5â€“8 minutes. Remove from heat and stir in vadouvan. Let cool, 20â€“25 minutes. Strain through a fine-mesh sieve into a small bowl; discard solids. <br/>Step 9: Remove steak from oven and spoon one-third of spice-infused butter over, making sure to coat both sides. Poke thermometer probe in the center of the strip side and roast steak, basting every 30 minutes or so with remaining butter, until thermometer registers 120Â°, 1â€“1Â½ hours. Alternatively, use an instant-read thermometer to check steak every 15 minutes after the first hour, and every 5 minutes after 1Â½ hours. Once thawed, the temperature of the steak will rise about 1 degree a minute. <br/>Step 10: Remove steak from oven. Reheat reserved oil in skillet back to 350Â° over medium-high. Fry steak a second time, turning once, until a deeply browned crust forms on all sides, about 2 minutes per side. <br/>Step 11: Transfer back to rack and let rest 10 minutes. (Frying again will re-crisp your crust, lock in juices, and develop more flavor.) <br/>Step 12: Use a thin knife to carve along both sides of the bone to remove strip and filet; cut into Â½\"-thick slices. Arrange on a platter alongside bone. Pour any butter and juices that have accumulated in baking sheet over top." , "ingredients" : [ { "name" : "Steak" , "tag" : [ "beef"] , "description" : "2-inch-thick bone-in porterhouse steak" , "quantity" : "3" , "unit" : "pound" , "has" : "0"} , { "name" : "Salt" , "tag" : [ ] , "description" : "Kosher" , "quantity" : "1" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Sugar" , "tag" : [ ] , "description" : "Light Brown" , "quantity" : "1" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Pepper" , "tag" : [ ] , "description" : "Cayenne" , "quantity" : "0.5" , "unit" : "tsp" , "has" : "0"} , { "name" : "Oil" , "tag" : [ ] , "description" : "Rice bran or vegetable" , "quantity" : "0.5" , "unit" : "tsp" , "has" : "0"} , { "name" : "Butter" , "tag" : [ ] , "description" : "Unsalted" , "quantity" : "4" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Masala" , "tag" : [ ] , "description" : "or any spice mix of choice" , "quantity" : "1" , "unit" : "tsp" , "has" : "0"}]}]),
	user: JSON.stringify({name: "Larry Gergich", message: "User is authenticated", token: "59bae6bc46e0fb00012e87b5", username: "larry"})
};

//Return the correct dummy data
function simPantryResource(url){
	let dataKey = ""
	if(url.endsWith("/spec/ingredient")){
		dataKey = "specIngredient";
	}
	else if(url.endsWith("/spec/ingredient/types")){
		dataKey = "specIngredientTypes";
	}
	else if(url.endsWith("/spec/ingredient/edits")){
		dataKey = "specIngredientEdits";
	}
	else if (url.endsWith("/spec/ingredient/location")) {
		dataKey = "specIngredientLocation";
	}else{
		dataKey="data"
	}
	return DEV_RESP.pantry[dataKey];
}

//proxy requests to pantry to actual kubernetes service
router.all(['/pantry', '/pantry*'], function(req, res){
	//If in dev environment, respond with our hardcoded JSON
	if(NODE_ENV === "development"){
		res.send(simPantryResource(req.url));
	}else{
		var reqUrl = apiRoutes.pantry + req.url;
		//res.send("{\"url\": \""+reqUrl+"\"}");
		req.pipe(request(reqUrl)).pipe(res);
	}
});

//proxy requests to pantry to actual kubernetes service
router.all(['/recipes', '/recipes*'], function(req, res){
	//If in dev environment, respond with our hardcoded JSON
	if(NODE_ENV === "development"){
		res.send(DEV_RESP.recipes);
	}else{
		var reqUrl = apiRoutes.recipes + req.url;
		//res.send("{\"url\": \""+reqUrl+"\"}");
		req.pipe(request(reqUrl)).pipe(res);
	}
});

//proxy requests to pantry to actual kubernetes service
router.all(['/users', '/users*'], function(req, res){
	//If in dev environment, respond with our hardcoded JSON
	if(NODE_ENV === "development"){
		res.send(DEV_RESP.user);
	}else{
		var reqUrl = apiRoutes.user + req.url;
		//res.send("{\"url\": \""+reqUrl+"\"}");
		req.pipe(request(reqUrl)).pipe(res);
	}
});

module.exports = router;
