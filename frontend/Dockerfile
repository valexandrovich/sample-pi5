# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG APP_PATH=sample

ENV VITE_BASE_PATH=/${APP_PATH}/
ENV VITE_API_URL=/${APP_PATH}/api

RUN npm run build

# Production stage
FROM nginx:alpine

ARG APP_PATH=sample

# Copy built files to path based on APP_PATH
COPY --from=builder /app/dist /usr/share/nginx/html/${APP_PATH}

# Copy nginx template and entrypoint
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
