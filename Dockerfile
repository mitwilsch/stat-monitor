FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./

COPY . ./

#RUN npm install --production

CMD ["npm", "run", "prodServer"]