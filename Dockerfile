FROM node:14
WORKDIR /app
COPY ./package.json package.json
RUN yarn
EXPOSE 8080
ENTRYPOINT ["yarn", "run", "start:prod"]

