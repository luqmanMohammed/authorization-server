FROM node:8.16.2-alpine

LABEL maintainer="m.luqman077@gmail.com"

WORKDIR /app

COPY . ./app

RUN npm install --save

ENV DB_URI=mongodb://127.0.0.1:27017/oreo-auth

ENV REDIS_URI=redis://:authpassword@127.0.0.1:6380/4

ENV JWT_SECRET=very_secret

ENV BCRYPT_ROUNDS=10

ENV PORT=5500

ENTRYPOINT [ "npm","start" ]

CMD [ ]

EXPOSE 7000