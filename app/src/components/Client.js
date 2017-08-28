function request(path, method, cb, body) {
	//default body to empty object
	body = body === undefined ? {} : body;

	//perform fetch with defined options
	return fetch(path, {
		headers: {
			'Accept': "application/json",
			'Content-Type': "application/json"
		},
		method: method,
		body: JSON.stringify(body)	
	})
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

const Client = { search };
export default Client;
