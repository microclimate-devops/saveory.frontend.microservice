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
   
