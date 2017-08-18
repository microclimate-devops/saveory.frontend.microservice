# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.8.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Setup express server
COPY appServer .
RUN npm install
CMD node server.js

# Install all dependencies of the current project.
RUN mkdir app
COPY app/package.json app/package.json
COPY app/npm-shrinkwrap.json app/npm-shrinkwrap.json
RUN cd app && npm install

# Copy all app files into the image.
COPY app app/

# Build for production.
RUN cd app && npm run build --production
RUN mv app/build .
#CMD ["npm", "start"]

