FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package.json package-lock.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./

# Copy packages and api
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database
COPY apps/api ./apps/api

RUN npm ci

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

# API runs with tsx (supports TS + workspace imports)
CMD ["npx", "tsx", "apps/api/src/index.ts"]
