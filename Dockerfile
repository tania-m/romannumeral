# Run tests in a different container before release build -----
FROM node:10.16.0-alpine AS test

RUN mkdir -p app
WORKDIR app
COPY . .

ENV NODE_ENV dev
RUN npm i && npm install -g mocha && mocha test


# Release/Production version build ----------------------------
FROM node:10.16.0-alpine

# ENV variables in Dockerfile overwrite those in settings.env
ENV API_VERSION=1.0.0
ENV NODE_ENV=production
ENV ACTIVE_RATE_LIMITER=active

RUN mkdir -p app
WORKDIR app
COPY . .

RUN npm i --only=production

ENV PORT 8080
EXPOSE 8080

RUN addgroup -S romannumeralgroup && adduser -S romannumeral -G romannumeralgroup
USER romannumeral

CMD ["node", "./server.js"]
