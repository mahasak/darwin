FROM node:10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist/server .
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

CMD ["pm2-runtime","server.js"]