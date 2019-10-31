FROM node:latest

LABEL maintainer="m.luqman077@gmail.com"

ENV DB_URI=mongodb://127.0.0.1:27017/oreo-auth

ENV REDIS_URI=redis://:authpassword@127.0.0.1:6380/4

ENV JWT_SECRET=very_secret

ENV BCRYPT_ROUNDS=10

ENV PORT=5500

WORKDIR /app

COPY ./ ./

RUN npm install --save

ENTRYPOINT [ "npm","start" ]

CMD [ ]

EXPOSE 5500