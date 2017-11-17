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
		ingredientNames: ["chicken", "light brown sugar", "vegetable oil", "masala", "cayenne pepper", "Butter", "steak", "Orange", "Apple"],
		ingredientsAutoUpdate: {
			code: 206,
			failed: [
				{ingredient: "salt", quantity: 3, unit: "tbsp", location: "Pantry", expiration:"04/13/2019"},
				{ingredient: "cayenne", quantity: 1, unit: "cup", location: "Pantry", expiration:"04/13/2019"}
			],
			msg: "Could not automatically update some ingredients due to unresolvable unit conversion"
		},
		ingredientsManualUpdate: {
			code: 200,
			failed: [],
			msg: "Updated ingredients"
		},
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
		    "{\"location\":\"text\"}"
		],
		specIngredientUnits: [
			"cup",
			"tbsp",
			"tsp",
			"oz",
			"lbs"
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
		],
		specIngredientId: {
			id: "ingredient"
		},
		ingredientOp: {
			code: 200,
			msg: "Ingredient Operation Worked"
		},
		unknown: {
			code: 404,
			msg: "Unknown request"
		}
	},
	recipes: JSON.stringify([ { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbdb"} , "name" : "Seafood Gumbo" , "id" : "Seafood-Gumbo-747348" , "author" : "Saveur" , "tag" : [ "Main Dishes"] , "ingredients" : [ "blue crabs" , "canola oil" , "flour" , "garlic" , "celery" , "yellow onion" , "green bell pepper" , "seafood stock" , "worcestershire sauce" , "cayenne" , "bay leaves" , "kosher salt" , "ground black pepper" , "medium shrimp" , "lump crab meat" , "parsley" , "fresh lemon juice" , "scallions" , "cooked white rice"] , "time" : "4800" , "imageURL" : "http://lh5.ggpht.com/rZssPSaxYhQQHl_kWhnJiIdRs6Sqsr8bAeT1ORoGhQtzDQ6ENv0Ii6G6m3Ap71iXGq8s6hTFZu2l1g9ffiSW1w=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbe4"} , "name" : "Seafood Gumbo" , "id" : "Seafood-Gumbo-1500915" , "author" : "Eating Well" , "tag" : [ "Soups" , "Main Dishes"] , "ingredients" : [ "canola oil" , "okra" , "white vinegar" , "all-purpose flour" , "green bell pepper" , "yellow onion" , "scallions" , "chopped celery" , "garlic" , "diced tomatoes" , "seafood stock" , "deli ham" , "bay leaves" , "fresh thyme" , "worcestershire sauce" , "hot sauce" , "salt" , "shrimp" , "lump crab meat" , "chopped parsley"] , "time" : "8100" , "imageURL" : "https://lh3.googleusercontent.com/S_NZZi2tC9o4kRAFy4S00cu4K3cYshKkXAaHIoyvmIr0-opeq93qLxYs5qyZy-BxOjmCJEqq4lc1ydQjmVemaQ=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbed"} , "name" : "Seafood Gumbo" , "id" : "Seafood-Gumbo-1280456" , "author" : "Nicki's Random Musings" , "tag" : [ "Main Dishes"] , "ingredients" : [ "roux" , "medium shrimp" , "chicken stock" , "crab meat" , "andouille sausage" , "chopped tomatoes" , "black pepper" , "old bay seasoning" , "creole seasoning"] , "time" : "3900" , "imageURL" : "http://lh3.googleusercontent.com/b8t-7UHsHGvSmdOeRd3som-pP0_FR5xsUsVmvYcsOrFYu3b5LGE-BxM2IMHXd4vY9zcIbhXPx5Y4iRE-fpY97Q=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbf6"} , "name" : "Seafood Gumbo" , "id" : "Seafood-Gumbo-1912776" , "author" : "Louisiana Cookin'" , "tag" : [ "Soups" , "Main Dishes"] , "ingredients" : [ "vegetable oil" , "all-purpose flour" , "chopped onion" , "chopped green bell pepper" , "red bell pepper" , "chopped celery" , "minced garlic" , "okra" , "beer" , "seafood stock" , "file powder" , "bay leaves" , "cajun seasoning" , "meat" , "worcestershire sauce" , "kosher salt" , "cayenne pepper" , "shrimp" , "fillet red snapper" , "shucked oysters" , "lump crab meat" , "fresh parsley" , "cooked rice" , "green onions"] , "time" : "5400" , "imageURL" : "https://lh3.googleusercontent.com/ffGpJWbpYSpJmfLnP8tDpzzEn38RVur7E5NvvGYQdxExqmq_Zw1-hkCbfbALmv5MHMPZ88GHo1LJJmFU6hpvrQ=-c" , "has" : [ "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "cayenne pepper" , "vegetable oil"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc0a"} , "name" : "Seafood Gumbo" , "id" : "Seafood-Gumbo-2046849" , "author" : "Louisiana Seafood" , "tag" : [ "Soups" , "Main Dishes"] , "ingredients" : [ "vegetable oil" , "all-purpose flour" , "chopped onion" , "chopped green bell pepper" , "red bell pepper" , "chopped celery" , "minced garlic" , "okra" , "beer" , "seafood stock" , "file powder" , "bay leaves" , "cajun seasoning" , "meat" , "shells" , "worcestershire sauce" , "kosher salt" , "cayenne pepper" , "shrimp" , "fillet red snapper" , "shucked oysters" , "lump crab meat" , "fresh parsley" , "cooked rice" , "green onions"] , "time" : "6300" , "imageURL" : "https://lh3.googleusercontent.com/LiZ5cNRfI5kLYyBcEw8RpSvA_RaK__9C88cYdJmI2MesCgZRPlo_0yRBXGtVnv4iZdputLzJpEmteZea3NyP=-c" , "has" : [ "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "cayenne pepper" , "vegetable oil"]}]),
	user: JSON.stringify({name: "Larry Gergich", message: "User is authenticated", token: "59bae6bc46e0fb00012e87b5", username: "larry"})
};

//Return the correct dummy data
function simPantryResource(url, method){
	var dataKey = "";
	if(url.endsWith("/ingredients")){
			dataKey = "ingredientNames";
	}
	else if(url.endsWith("/ingredients/auto")){
		dataKey = "ingredientsAutoUpdate"
	}
	else if(url.endsWith("/ingredients/manual")){
		dataKey = "ingredientsManualUpdate"
	}
	else if(url.endsWith("/spec/ingredient")){
		dataKey = "specIngredient";
	}
	else if (url.endsWith("/spec/ingredient/id")) {
		dataKey = "specIngredientId";
	}
	else if(url.endsWith("/spec/ingredient/types")){
		dataKey = "specIngredientTypes";
	}
	else if(url.endsWith("/spec/ingredient/units")){
		dataKey = "specIngredientUnits";
	}
	else if(url.endsWith("/spec/ingredient/edits")){
		dataKey = "specIngredientEdits";
	}
	else if (url.endsWith("/spec/ingredient/location")) {
		dataKey = "specIngredientLocation";
	}
	else if(/ingredient.*$/.test(url)){
		dataKey = "ingredientOp";
	}
	else{
		dataKey="data"
	}
	return DEV_RESP.pantry[dataKey];
}

//proxy requests to pantry to actual kubernetes service
router.all(['/pantry', '/pantry*'], function(req, res){
	//If in dev environment, respond with our hardcoded JSON
	if(NODE_ENV === "development"){
		res.send(simPantryResource(req.url, req.method));
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
