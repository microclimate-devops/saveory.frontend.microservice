# Frontend for the Saveory Microservice App
- Saveory Project Website 

## Quick Overview
The frontend service is the intersection where all the backend services meet; saveory.pantry.microservice, saveory.recipes.microservice, and saveory.users.microservice. We used the [create-react-app](https://github.com/facebookincubator/create-react-app) project to start a NodeJS backed React application. 
The service is split into two sections:
1. **The React web UI - *located in `app/`***
	- The components that form the Saveory interface are located in `app/src/components`
2. **The expressJS server - *located in `appServer/`***
	- A simple configuration to serve the web UI bundle and proxy api requests to backend services
	- In production
		- The proxy relies on Kubernetes DNS lookup to redirect requests to the correct service
		- The proxy config can be found in the `appServer/routes/api/saveory_api.js` file
			- Look for the `apiRoutes` variable
		- You may need special configuration for deployment strategies other than Kubernetes
	- In development mode 
		- Requests are responded to with harcoded data to simulate backend interactions

### Run Locally for development
1. In one terminal window startup the server (used only for proxying dummy data in development mode)
      ```bash
         cd appServer
         export NODE_ENV=development
         npm install
         node server.js
      ```
2. Startup the app in another terminal window
      ```bash
         cd app
         npm install
         npm start
      ``` 
### Run in Kubernetes
  1. IBM Cloud private
  	- We recommend using the IBM cloud private Kubernetes environment for it's handy integration tools
	- Setup the Microservice Builder Pipeline with the GitHub organization you forked this repo to
	- Check the Jenkins dashboard for build results
  2. Manual install
  	- Kubernetes service and deployment configuration can be found in the manifests/kube.deploy.yml file

### Run in Docker
 - Use the included Dockerfile to startup a container
