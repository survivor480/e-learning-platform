

# Import the image that is needed to create the Dockerfile
FROM node:hydrogen-bullseye-slim as development

WORKDIR /home/node/app

COPY . ./

RUN npm install

CMD ["tsc", "&&", "node", "dist/app.js"]

EXPOSE 3000