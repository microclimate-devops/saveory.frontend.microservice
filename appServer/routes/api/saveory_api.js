var NODE_ENV = process.env.NODE_ENV;
var express = require('express');
var request = require('request');
var router = express.Router();

var apiRoutes = {
	pantry: "http://pantry-service:9080/Pantry",
	recipes: "http://recipeservice:9080/RecipeService",
	user: "http://saveoryusers-service:9080/saveoryusers"
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
		    {"location":"text"}
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
	recipes: JSON.stringify([ { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc1f"} , "name" : "Caldo de Mariscos (Mexican Seafood Soup)" , "id" : "Caldo-de-Mariscos-_Mexican-Seafood-Soup_-1502145" , "author" : "Palatable Pastime" , "tag" : [ "Soups" , "Main Dishes"] , "ingredients" : [ "chopped onion" , "garlic" , "tomatoes with juice" , "water" , "chili powder" , "turnips" , "potatoes" , "carrots" , "bouillon cube" , "base" , "tilapia" , "shrimp" , "seafood" , "lime wedges" , "chopped cilantro" , "serrano" , "jalapeno chilies"] , "time" : "3600" , "imageURL" : "https://lh3.googleusercontent.com/3YxfvOx7msmKXtv0FAR4mRvXQFF4IdN_FVvljyfsl0EgE2QRcj49IRT2ymCMXpOmO_0IlH7TgOxnAhXc3vfS=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc31"} , "name" : "Marinated Seafood Salad (Veuva la Vida)" , "id" : "Marinated-Seafood-Salad-_Veuva-la-Vida_-1693076" , "author" : "Tasting Table" , "tag" : [ "Appetizers"] , "ingredients" : [ "bass filet stripe" , "lime juice" , "orange juice" , "kosher salt" , "red onion" , "medium shrimp" , "olive oil" , "tomato juice" , "fresh orange juice" , "ketchup" , "worcestershire sauce" , "Tabasco Pepper Sauce" , "old bay seasoning" , "garlic cloves" , "serrano chile" , "fish" , "shrimp" , "lump crab meat" , "cocktail sauce" , "cucumber" , "chopped cilantro" , "chopped parsley" , "scallions" , "avocado" , "fresh horseradish" , "tortilla chips"] , "time" : "2100" , "imageURL" : "https://lh3.googleusercontent.com/CdSpetTqTd2-yowMH-EJIGnV_Sme-xmjcRfCbfhXRa6rzU7IiK7RTPI82eQ1Xk6YQiWX_v6P93RjLu947pJAdQ=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc32"} , "name" : "Marinated Seafood Salad (Veuva la Vida)" , "id" : "Marinated-Seafood-Salad-_Veuva-la-Vida_-2145976" , "author" : "Tasting Table" , "tag" : [ "Appetizers"] , "ingredients" : [ "bass filet stripe" , "lime juice" , "orange juice" , "kosher salt" , "red onion" , "medium shrimp" , "olive oil" , "tomato juice" , "fresh orange juice" , "ketchup" , "worcestershire sauce" , "Tabasco Pepper Sauce" , "old bay seasoning" , "garlic cloves" , "serrano chile" , "fish" , "shrimp" , "lump crab meat" , "cocktail sauce" , "cucumber" , "chopped cilantro" , "chopped parsley" , "scallions" , "avocado" , "fresh horseradish" , "tortilla chips"] , "time" : "2100" , "imageURL" : "https://lh3.googleusercontent.com/tD2EnLsWRCqUZdB_epmhDF_OtsdTeEen2gk6tCh15z1uqbnu2BYrxSTI29_jYORZTWwox5iM_7ORz2_H3jCkZw=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbf8"} , "name" : "Seafood Pasta With Mushroom Cream Sauce" , "id" : "Seafood-Pasta-With-Mushroom-Cream-Sauce-2215961" , "author" : "The Spruce" , "tag" : [ "Main Dishes"] , "ingredients" : [ "butter" , "garlic cloves" , "sliced mushrooms" , "bay scallops" , "medium shrimp" , "rotini pasta" , "whipping cream" , "grated parmesan cheese" , "kosher salt" , "freshly ground black pepper"] , "time" : "2700" , "imageURL" : "https://lh3.googleusercontent.com/KhRTUlSJNVA5T-rQ0wjKBY5c6uf9qFctXGApR0XDrrlGNZtDnzUbBHRw3tLEW3z2lACRF3BweJK9XX2GsIVUig=-c" , "has" : [ "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "Butter"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc21"} , "name" : "Seafood Dip With Crab, Shrimp, or Lobster" , "id" : "Seafood-Dip-With-Crab_-Shrimp_-or-Lobster-2216206" , "author" : "The Spruce" , "tag" : [ "Appetizers"] , "ingredients" : [ "milk" , "lemon juice" , "onions" , "salt" , "paprika" , "curry powder" , "cream cheese" , "lobster"] , "time" : "1200" , "imageURL" : "https://lh3.googleusercontent.com/cXWM1j6Nv9qkI61TMyQWHAVx3Pj_9SlQyfDOW-Q_UBMLtrEmHkskp-A_h_rqpKsb7990V0fLBdpQtlxgVFSuhA=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbe1"} , "name" : "Seafood Boil" , "id" : "Seafood-Boil-1315486" , "author" : "Tasty Kitchen" , "tag" : [ "Main Dishes"] , "ingredients" : [ "old bay seasoning" , "onions" , "lemon" , "garlic cloves" , "new potatoes" , "sausages" , "corn husks" , "crab leg" , "shrimp" , "clams" , "mussels"] , "time" : "3300" , "imageURL" : "http://lh3.googleusercontent.com/HdxVwV79XyY5eZiL0PgqB8zkZPxeVFG-zmz295yDwlJjneT0Cgy2cZ1CbTcdSVcw1HkePjG15PWR_7El1AocNg=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbe5"} , "name" : "Seafood Spaghetti" , "id" : "Seafood-Spaghetti-2115996" , "author" : "Laylita's Recipes" , "tag" : [ "Main Dishes"] , "ingredients" : [ "oil" , "white onion" , "garlic" , "chopped cilantro" , "chopped parsley" , "dried oregano" , "ground cumin" , "achiote powder" , "chili powder" , "diced tomatoes" , "seafood broth" , "tomato paste" , "fish" , "mussels" , "clams" , "shrimp" , "calamari" , "bay scallops" , "spaghetti" , "salt" , "grated parmesan cheese" , "green onions"] , "time" : "3600" , "imageURL" : "https://lh3.googleusercontent.com/q5aX_2lyGukX1sv80MAwsPRaT6oNAvLJvRrGKt7xENCWQbncp94HS9kL2rK6639I9F5V11264vb7Wn16fitylw=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbe7"} , "name" : "Seafood Pancakes" , "id" : "Seafood-Pancakes-Serious-Eats-200963" , "author" : "Serious Eats" , "tag" : [ "Breakfast and Brunch"] , "ingredients" : [ "seafood" , "scallions" , "ginger" , "garlic" , "salt" , "all-purpose flour" , "water" , "eggs" , "vegetable oil" , "crushed red pepper" , "soy sauce"] , "time" : "2400" , "imageURL" : "http://lh4.ggpht.com/GQPXuVtmT2Of1KsQCw8t_noezFdm2WmRELSJetYaOoaG7NNL-LbR7UWbjJb1sXYkPBNFMqml0j3Gz0g16OiDUg=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "1" , "0" , "0"] , "matchingIngredients" : [ "vegetable oil"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbf2"} , "name" : "Seafood Curry" , "id" : "Seafood-Curry-1074272" , "author" : "Hari Ghotra" , "tag" : [ "Main Dishes"] , "ingredients" : [ "coriander seeds" , "cumin seed" , "red chili peppers" , "cassia cinnamon" , "black peppercorns" , "fresh ginger" , "garlic cloves" , "turmeric" , "malt vinegar" , "seafood" , "vegetable oil" , "fresh curry leaves" , "onions" , "coconut milk" , "lemon juice" , "salt" , "black pepper" , "fresh coriander"] , "time" : "1800" , "imageURL" : "http://lh3.googleusercontent.com/kebNx_Wj85d5SMjCF1XwJcV6OnqpGPY40KbmjjfKOtHYpu-E-CIr6HZbk56VhKtEci59QjNPwCN6eHvWaK-T=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "vegetable oil"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbf7"} , "name" : "Seafood Chowder" , "id" : "Seafood-Chowder-1970852" , "author" : "Serena Bakes Simply from Scratch" , "tag" : [ "Soups"] , "ingredients" : [ "butter" , "olive oil" , "leeks" , "celery" , "flour" , "seafood stock" , "potatoes" , "fresh thyme" , "cod" , "shrimp" , "scallops" , "clams" , "lump crab meat" , "sweet corn" , "heavy cream" , "chives"] , "time" : "5400" , "imageURL" : "https://lh3.googleusercontent.com/xjNwymq7s4TwNuLHHgGgGbmySrmuJ32_mVRdS3QhZ8X3lfnHmXxhoDDnrVPIXSoBpQP487bdwTHjawCOphvdBYc=-c" , "has" : [ "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "Butter"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbfa"} , "name" : "Seafood Pate" , "id" : "Seafood-Pate-2055576" , "author" : "Marmita" , "tag" : [ "Appetizers" , "Lunch"] , "ingredients" : [ "dried fish" , "mayonnaise" , "eggs" , "onions" , "parsley" , "baguette"] , "time" : "1800" , "imageURL" : "https://lh3.googleusercontent.com/CiA_j896BxfzW8skBLJMVrJKiYn9Vxazzd0LEhiD8mP8fqcUfXYqTL3cElGLCZUK5vhtEVs9H8PKn9Y7wdPd=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfbfc"} , "name" : "Seafood Linguine" , "id" : "Seafood-Linguine-1464360" , "author" : "An Italian in my Kitchen" , "tag" : [ "Main Dishes"] , "ingredients" : [ "mixed seafood" , "fresh parsley" , "olive oil" , "pepper flakes" , "salt" , "linguine" , "pasta"] , "time" : "1800" , "imageURL" : "https://lh3.googleusercontent.com/4m0YpQy74cDXdMHgI6LXW3hUcOhZ2WEmVMBWE3i-npVHVCAwylNCsjI7-_zKq79TOpaVPxDWmsE6v9NATNaJCQ=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc02"} , "name" : "Seafood Bisque" , "id" : "Seafood-Bisque-1932580" , "author" : "The Chef Next Door Michigan" , "tag" : [ "Soups"] , "ingredients" : [ "butter" , "medium shrimp" , "chopped onion" , "chopped celery" , "flour" , "seafood stock" , "salt" , "black pepper" , "cajun seasoning" , "lump crab meat" , "heavy cream" , "chopped parsley"] , "time" : "3600" , "imageURL" : "https://lh3.googleusercontent.com/dkpixHTjkxxrh0iPmh16diLSLQQZGSIsoG0LTR20XK9VMKfEBQ4D3FIe6U1EkTMxlLYJVqNWV9U5uTyLO_0Xlg=-c" , "has" : [ "1" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "Butter"]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc08"} , "name" : "Seafood Stew" , "id" : "Seafood-Stew-1070534" , "author" : "Recipes, Food and Cooking" , "tag" : [ "Soups" , "Main Dishes"] , "ingredients" : [ "mixed seafood" , "crushed tomatoes" , "water" , "garlic" , "celery" , "onions" , "carrots" , "shallots" , "potatoes" , "salt" , "pepper" , "basil" , "greek seasoning" , "sriracha sauce"] , "time" : "4200" , "imageURL" : "http://lh3.googleusercontent.com/7jLwkARmthZI7qQuHUGxPeB3tqoEAfdxPsuCbrmQwfI3nlWm1EFOp9ZEXjG3kgUtIs0Hc1Wx6sOLSe18etROhBo=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc0b"} , "name" : "Seafood Soup" , "id" : "Seafood-Soup-2173716" , "author" : "Tasteaholics" , "tag" : [ "Soups"] , "ingredients" : [ "cod" , "calamari" , "shrimp" , "coconut oil" , "tomato sauce" , "coconut cream" , "seafood broth" , "water" , "medium carrot" , "celery" , "green onions" , "garlic" , "onions" , "mushrooms" , "lime" , "lemon" , "salt" , "pepper" , "red pepper flakes" , "thyme" , "dill" , "bay leaves" , "basil" , "oregano" , "fresh parsley"] , "time" : "5100" , "imageURL" : "https://lh3.googleusercontent.com/p8qp7vaNYF7ac4noFSZ08QTWs5gVq4iouZBR2e-UWPrS4t4n5YNOUQp4Cayb-fesuHFW61AxfGOCi0VWTtv5=-c" , "has" : [ "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ ]} , { "_id" : { "$oid" : "59e8c58d46e0fb0001ccfc0c"} , "name" : "Seafood Chowder" , "id" : "Seafood-Chowder-1865279" , "author" : "Julia McPhee" , "tag" : [ "Soups"] , "ingredients" : [ "marinara sauce" , "seafood stock" , "onions" , "butter" , "garlic cloves" , "fresh coriander" , "chili flakes" , "cream" , "salt" , "pepper"] , "time" : "1500" , "imageURL" : "https://lh3.googleusercontent.com/rBQ7hZdUz6zq0ndVay4MT096gPqQLxqv-nXS2LZkcU4GZcDV2F5CWtBFW3UFZl79oT09o8ct6oPPI-PL3e5A8g=-c" , "has" : [ "0" , "0" , "0" , "1" , "0" , "0" , "0" , "0" , "0" , "0"] , "matchingIngredients" : [ "Butter"]} ]),
	user: JSON.stringify({name: "Larry Gergich", message: "User is authenticated", token: "59bae6bc46e0fb00012e87b5", username: "larry"})
};

function setAutoUpdateData(body){
	if(Array.isArray(body)){
		DEV_RESP.pantry.ingredientsAutoUpdate.failed = body;
	}
}

//Return the correct dummy data
function simPantryResource(req){
	const url = req.url;
	const method = req.method;
	var dataKey = "";
	if(url.endsWith("/ingredients")){
			dataKey = "ingredientNames";
	}
	else if(url.endsWith("/ingredients/auto")){
		setAutoUpdateData(req.body);
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
		res.send(simPantryResource(req));
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
