### Stage 1

FROM node:8 as node
LABEL author="Joshua Baert"
WORKDIR /build
COPY ./public .
RUN npm install
RUN npx gulp

### Stage 2

FROM node:8
WORKDIR /app
COPY ./package.json package.json
RUN npm install
COPY ./index.js index.js
COPY ./config.js config.js
COPY --from=node /build /app/public
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start:prod"]

