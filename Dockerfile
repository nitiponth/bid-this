FROM node:14.18.0-alpine

WORKDIR /bidThis

COPY package.json /bidThis

RUN npm install

COPY . /bidThis

EXPOSE 3000

CMD [ "npm", "run", "prod" ]