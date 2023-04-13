FROM node

WORKDIR /app

COPY package*.json ./

COPY listener.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "listen"]