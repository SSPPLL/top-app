FROM node:22-alpine
WORKDIR /app
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000