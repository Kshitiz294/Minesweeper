##### Stage 1
FROM node:12.6.0 as node
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration
##### Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/out/ /usr/share/nginx/html
COPY  config/nginx.conf /etc/nginx/conf.d/default.conf