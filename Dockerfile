FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY server/package.json server/yarn.lock ./server/
RUN yarn --cwd server install --frozen-lockfile

FROM deps AS build

COPY . .

RUN yarn build:client
RUN yarn --cwd server build

FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV API_PORT=8787

COPY --from=build /app/dist ./dist
COPY --from=build /app/server/package.json ./server/package.json
COPY --from=build /app/server/yarn.lock ./server/yarn.lock
RUN yarn --cwd server install --frozen-lockfile --production=true
COPY --from=build /app/server/dist ./server/dist

EXPOSE 8787

CMD ["node", "server/dist/index.js"]
