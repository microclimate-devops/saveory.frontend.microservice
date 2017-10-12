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
	pantry: JSON.stringify(
		{}
	),
	recipes: JSON.stringify({}),
	user: JSON.stringify({})
};

//proxy requests to pantry to actual kubernetes service
router.all(['/pantry', '/pantry*'], function(req, res){
	//If in dev environment, respond with our hardcoded JSON
	if(NODE_ENV === "development"){
		res.send(DEV_RESP.pantry);
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
