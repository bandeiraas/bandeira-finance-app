# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace config
COPY package.json package-lock.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./

# Copy packages (needed for workspaces)
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database
COPY apps/web ./apps/web

# Install all deps (from root for workspaces)
RUN npm ci

# Build args for Vite env (baked at build time)
ARG VITE_API_URL=http://localhost:3001
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build -w @bandeira/web

# Production stage - nginx
FROM nginx:alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
