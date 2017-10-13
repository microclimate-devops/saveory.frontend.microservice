# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.8.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV development

# Install all dependencies of the current project.
RUN mkdir app
COPY package.json app/package.json
COPY npm-shrinkwrap.json app/npm-shrinkwrap.json
RUN cd app && npm install

# Copy all app files into the image.
COPY . app/

# Build for development
CMD cd app && npm start

