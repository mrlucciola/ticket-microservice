# CONTEXT IS AT ROOT OF PROJECT
FROM node:alpine

ARG SRV=auth
ARG SRV_PATH=services/$SRV

WORKDIR /app

# add workspace config
COPY *.json .yarnrc.yml yarn.lock ./
COPY .yarn/ ./.yarn

# add app source & config
COPY $SRV_PATH/*.json $SRV_PATH/
COPY $SRV_PATH/src $SRV_PATH/src

# add common source & config
# COPY ./common ./common
# RUN rm -rf common/*/dist*

# install packages
RUN yarn install

WORKDIR /app/$SRV_PATH

# build typescript
RUN yarn build

USER node

EXPOSE 8080

# start in dev mode
ENTRYPOINT ["yarn", "start"]