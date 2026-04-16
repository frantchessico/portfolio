FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps AS build

WORKDIR /app
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN yarn build

FROM node:22-alpine AS runtime

WORKDIR /app

ARG API_PORT=8787
ARG MONGODB_URI=""
ARG MONGODB_DB_NAME=portfolio
ARG MONGODB_COLLECTION_NAME=contact_submissions
ARG RESEND_API_KEY=""
ARG RESEND_FROM_EMAIL="Francisco Inoque <hello@franciscoinoque.site>"
ARG ADMIN_NOTIFICATION_EMAIL=jaimeinoque20@gmail.com
ARG GIT_SHA=local

ENV NODE_ENV=production
ENV API_PORT=${API_PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV MONGODB_DB_NAME=${MONGODB_DB_NAME}
ENV MONGODB_COLLECTION_NAME=${MONGODB_COLLECTION_NAME}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV RESEND_FROM_EMAIL=${RESEND_FROM_EMAIL}
ENV ADMIN_NOTIFICATION_EMAIL=${ADMIN_NOTIFICATION_EMAIL}
ENV GIT_SHA=${GIT_SHA}

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

EXPOSE 8787

CMD ["node", "dist/index.js"]
