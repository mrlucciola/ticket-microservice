# CONTEXT IS AT ROOT OF PROJECT
FROM node:alpine3.17

ARG SRV=client
ARG SRV_PATH=$SRV

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

# Add workspace config
COPY *.json .yarnrc.yml yarn.lock ./
COPY node_modules/ ./node_modules
COPY .yarn/ ./.yarn

# Add app config files
COPY $SRV_PATH/*.json $SRV_PATH/next.config.mjs $SRV_PATH/next-env.d.ts $SRV_PATH/
# Add app source files
COPY $SRV_PATH/pages/* ./$SRV_PATH/pages/
RUN mkdir -p $SRV_PATH/dist $SRV_PATH/dist.cache; touch $SRV_PATH/tsconfig.tsbuildinfo
RUN chown -R node $SRV_PATH/tsconfig.tsbuildinfo $SRV_PATH/dist* node_modules

# Setup yarn (Install packages if not PNP)
RUN yarn set version 3.5.1

WORKDIR /app/$SRV_PATH

USER node

# build typescript
RUN yarn build:ts

EXPOSE 3000

# Start in dev mode
ENTRYPOINT ["yarn", "dev"]
