FROM node:latest

#Setup application environment and set as working directory
RUN mkdir /usr/src/nodeApps
RUN mkdir /usr/src/nodeApps/reactApp
ADD app /usr/src/nodeApps/reactApp
WORKDIR /usr/src/nodeApps/reactApp

#get modules in path
ENV PATH /usr/src/nodeApps/reactApp/node_modules/.bin:$PATH

#Install base react-app using create-react-app
RUN npm install -g create-react-app
#Install the server
RUN npm install -g serve
#prepare build
RUN npm run build
#launch build upon entry
CMD ["serve", "-s", "build"]

#RUN create-react-app app
#CMD ["npm", "run", "build"]
