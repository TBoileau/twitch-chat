FROM node:lts-alpine

WORKDIR /var/www/html
COPY package*.json /var/www/html/

RUN npm install -g npm@latest
RUN npm uninstall -g @angular/cli
RUN npm cache clean --force
RUN npm install -g @angular/cli@latest
RUN npm ci

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4201"]
