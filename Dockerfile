FROM node:slim

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x /start.sh

EXPOSE 3000

CMD ["/start.sh"]
