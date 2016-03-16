# Set up Node.js app server
FROM node:latest
MAINTAINER Artyom Trityak <art.trityak@gmail.com>

WORKDIR /usr/src/letsplay/

EXPOSE 5000

CMD npm install --no-bin-links && npm start
