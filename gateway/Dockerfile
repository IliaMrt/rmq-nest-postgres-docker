FROM node

WORKDIR /app

COPY package*.json ./

COPY listener.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "listen"]