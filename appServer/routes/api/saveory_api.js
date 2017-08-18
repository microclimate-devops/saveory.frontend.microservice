var express = require('express');
var request = require('request');
var router = express.Router();
var apiRoutes = {
	pantry: "http://pantry-service:9080/Pantry",
	recipes: "http://recipeservice-service:9080/RecipeService",
	user: "http://usermangement-service:9080/UserManagment"
};

//proxy requests to pantry to actual kubernetes service
router.all('/pantry', function(req, res){
	var reqUrl = apiRoutes.pantry + req.url;
	//res.send("Will send to this url: "+reqUrl);
	req.pipe(request(reqUrl)).pipe(res);
});

//proxy requests to pantry to actual kubernetes service
router.all('/recipes', function(req, res){
	var reqUrl = apiRoutes.recipes + req.url;
	//res.send("Will send to this url: "+reqUrl);
	req.pipe(request(reqUrl)).pipe(res);
});

//proxy requests to pantry to actual kubernetes service
router.all('/user', function(req, res){
	var reqUrl = apiRoutes.user + req.url;
	res.send("Will send to this url: "+reqUrl);
});

module.exports = router;
