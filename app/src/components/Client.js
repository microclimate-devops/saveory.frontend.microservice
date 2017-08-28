function request(path, method, cb, body) {
	//default body to empty object
	body = body === undefined ? {} : body;

	const options = {
		headers: {
			'Accept': "application/json",
			'Content-Type': "application/json"
		},
		method: method
	}
	
	//Add body if method is not GET
	if(method != "GET"){
		options.body = JSON.stringify(body);
	}

	//perform fetch with defined options
	return fetch(path, options)
	.then(checkStatus)
	.then(parseJSON)
	.then(cb);
}

function checkStatus(response) {
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
