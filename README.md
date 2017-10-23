# Frontend for the Saveory Microservice App

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
### Run in IBM Cloud private
1. Setup the Microservice Builder Pipeline with the GitHub organization you forked this repo to
2. Check the Jenkins dashboard for build results

### The Saveory Project
We want you to like your pantry. We want managing it to be fun. No more forgotten ingredients. The back of your fridge doesn't need to be a scary place. Saveory was made for that. It was made to be scalable, independent, and free. Our journey begins and ends with the platform. One that is elaborate and cutting-edge but also friendly and easy to pickup. This is a story about developing microservices in the cloud. The IBM cloud.

### Technology Pit Stop
- Saveory is developed with IBM Microservice Builder and NodeJS.
- Saveory builds with Docker
- Saveory deploys with the continuous integration IBM Microservice Builder Pipeline
- Saveory runs on IBM Cloud Private. Welcome to Kubernetes
	

#### Being RESTful 4 services later
##### A. Palatable Pantries
- Start with a better way to keep track of ingredients. Just went to the store? There's an endpoint to add to your virtual pantry. Want to update your pantry to reflect ingredient usage in a recipe? We got you covered. Don't take my word for it, here's our RESTful HTTP API:
```{INSERT SWAGGER HERE}```
- Built with IBM Microservice Builder 

###### B. Remixed Recipes
- Ready to find recipes that prioritize using the stuff you already have? Look no further. Get only the best options that work with your dietary restrictions.
```{INSERT SWAGGER HERE}```	
- Built with IBM Microservice Builder 

###### C. 'Umble Users
- Save your preferences. Change your password. It's all here.
```{INSERT SWAGGER HERE}```
- Built with IBM Microservice Builder 

###### D. Flexible Frontend
- The interace that ties it all together. See ingredients that are expiring soon or search for that sweet recipe. 		
- Built with ReactJS on NodeJS
