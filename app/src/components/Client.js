/**
 * Performs a fetch request with specified parameters
 * @param {string} path - The URL to make the request to
 * @param {string} method - The HTTP method
 * @param {function} cb - The callback for successfull requests
 * @param {function} eh - The callback for unsuccessfull requests
 * @param {object} body - The body to send
 * @calls {request, console.log fetch, eh}
 * @return {Promise} - The request response
 */
function request(path, method, cb, eh, body) {
	console.log("Path of request: "+path);
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

	//Add body if method is POST or PUT
	if(method === "POST" || method === "PUT"){
		options.body = JSON.stringify(body);
	}

	//perform fetch with defined options
	try{
		return fetch(path, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(cb)
		.catch((e) => {eh(e)});
	} catch(e){
		console.log("Failed to fetch resource at path "+path+". The request was sent with these options: "+JSON.stringify(options)+". Message: "+e.message);
	}
}

/**
 * Checks the response status, returns response if valid, throws exception otherwise
 * @param {HTTP response} response -
 * @calls {checkStatus, console.log, Error}
 * @return {HTTP responde} - The request response
 */
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

/**
 * @param {HTTP response} response
 * @calls {response.json}
 * @return {JSON string}  - response as JSON
 */
function parseJSON(response) {
  return response.json();
}

const Client = { request };
export default Client;
