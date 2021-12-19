# stage 0
FROM node:14.17.0-alpine3.13 as node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
COPY . .
ARG configuration=production
RUN npm install
RUN npm run build --configuration=$configuration

# stage 1
FROM nginx:alpine
COPY --from=node /app/dist/angular-front /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
