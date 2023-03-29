FROM node:19-alpine as deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:19-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

FROM node:19-alpine AS prod
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD [ "node", "dist/main.js" ]
