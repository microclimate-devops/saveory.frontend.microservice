# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.8.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV development

# Setup express server
COPY . .
RUN npm install
CMD node server.js
