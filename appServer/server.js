var express = require('express');
var app = express();
var api = require('./routes/api/saveory_api.js')

//Serve static build from webpack at root
app.use("/", express.static('build'));

//proxy api requests to router
app.use('/api', api);

//start listening
app.listen(3001, function(){
	console.log("Proxy server listening on port 3001");
});  
