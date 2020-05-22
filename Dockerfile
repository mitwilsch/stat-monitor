FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./

COPY . ./

CMD ["npm", "run", "start"]