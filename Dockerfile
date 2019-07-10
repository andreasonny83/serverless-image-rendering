FROM lambci/lambda:build-nodejs10.x

WORKDIR /var/task

VOLUME /var/task/
COPY package.json /var/task/

# RUN npm install