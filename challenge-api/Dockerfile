FROM node:14.17.0-alpine3.13 as node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
