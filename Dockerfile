FROM mhart/alpine-node:8.11.3

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm", "start" ]
