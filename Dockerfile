FROM node:latest

#Setup application environment and set as working directory
RUN mkdir /usr/src/nodeApps
ADD app /usr/src/nodeApps/
WORKDIR /usr/src/nodeApps/app

#get modules in path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

#Install base react-app using create-react-app
RUN npm install -g create-react-app
#RUN create-react-app app
CMD ["npm", "start"]
