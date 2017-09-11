function request(path, method, cb, eh, body) {
	//default body to empty object
	body = body === undefined ? {} : body;
	
	//default error handler to display message
	//eh = eh === undefined ? (e) => {console.log("Caught error with default handler, please pass your own error handler."); console.log(e);} : eh;
	if(eh === undefined || typeof eh !== 'function'){
		console.log("Didn't find adequate error handler for "+method+" to "+path);
		eh = (e) => {
			console.log("No error handler defined. Using default");
			console.log(e);
		};
	}

	const options = {
		headers: {
			'Accept': "application/json",
			'Content-Type': "application/json"
		},
		method: method
	}
	
	//Add body if method is not GET
	if(method === "POST" || method === "PUT"){
		options.body = JSON.stringify(body);
	}

	//perform fetch with defined options
	return fetch(path, options)
	.then(checkStatus)
	.then(parseJSON)
	.then(cb)
	.catch((e) => {console.log(e); eh(e);});
}

function checkStatus(response) {
  console.log("Response status: "+response.status);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { request };
export default Client;
