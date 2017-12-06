var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./routes/api/saveory_api.js')

//Serve static build from webpack at root
app.use("/", express.static('build'));

//parse json bodies if in development
if(process.env.NODE_ENV === "development"){
	app.use(bodyParser.json());
}

//proxy api requests to router
app.use('/api', api);

//start listening
app.listen(3001, function(){
	console.log("Proxy server listening on port 3001");
});
