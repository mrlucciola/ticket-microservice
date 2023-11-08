# CONTEXT IS AT ROOT OF PROJECT
FROM node:alpine3.17

ARG APP=client
ARG APP_PATH=$APP

WORKDIR /app

# Add workspace config
COPY *.json .yarnrc.yml yarn.lock ./
COPY node_modules/ ./node_modules
COPY .yarn/ ./.yarn

# Add app source & config
COPY $APP_PATH/*.json $APP_PATH/*.mjs $APP_PATH/*.html $APP_PATH/
COPY $APP_PATH/pages/* ./$APP_PATH/pages/

# Install packages
RUN yarn set version 3.5.1

WORKDIR /app/$APP_PATH

USER client

EXPOSE 3000

# Start in dev mode
ENTRYPOINT ["yarn", "dev"]
