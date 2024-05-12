FROM node:20

# Create app directory
WORKDIR /usr/src/prideispolitical-cph

COPY . ./

RUN yarn

# SRC: https://jonathanmh.com/deploying-a-nuxt-js-app-with-docker/
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT

EXPOSE 3000

RUN yarn nuxt generate

CMD npx serve .output/public
