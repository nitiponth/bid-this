FROM node:14.18.0-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

CMD [ "npm", "run", "prod" ]