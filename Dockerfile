FROM node:10-buster

RUN npm install pm2 -g

ENV NODE_ENV development

RUN mkdir -p /app
COPY web /app/web
COPY server /app/server
COPY start.sh /app/

WORKDIR '/app'

RUN cd server && npm ci && cd ..
RUN cd web && npm ci && NODE_ENV=production npm run build && cd ..
RUN mkdir -p /app/server/public/
RUN mv /app/web/dist/* /app/server/public/

EXPOSE 3333

CMD ["./start.sh"]
