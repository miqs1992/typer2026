ARG NODE_VERSION=22.16
ARG IMAGE=node:${NODE_VERSION}-alpine

FROM $IMAGE AS build

WORKDIR /app

COPY ./tsconfig*.json ./package*.json ./

RUN npm ci

COPY ./nest-cli.json ./*.ts ./
COPY ./src/ ./src/

RUN npm run build

FROM $IMAGE AS run

ARG BUILD_ID
ENV BUILD_ID=${BUILD_ID:-unknown}

WORKDIR /app

COPY ./package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000
USER node

CMD ["node", "dist/src/main.js"]