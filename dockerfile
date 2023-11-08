# Stage 1: install deps
FROM node:16-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozwn-lockfile


# Stage 2: build app
FROM node:16-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 2: run app
FROM node:16-alpine as runner
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD [ "node", "server.js" ]
