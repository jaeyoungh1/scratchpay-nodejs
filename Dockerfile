FROM node:16
WORKDIR /usr/app


COPY . .
RUN npm install

EXPOSE 3000

ENV PORT=3000 JWT_SECRET=strong_secret_example JWT_EXPIRES_IN=604800

CMD ["node", "index.js"]