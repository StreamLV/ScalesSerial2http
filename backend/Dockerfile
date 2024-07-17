FROM node:16

RUN npm install pm2 -g

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install -qy

RUN apt-get update && apt-get install -y \
    mc

COPY . .

EXPOSE 7917

CMD ["npm", "start"]