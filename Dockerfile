# Production Dockerfile for backend API
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
COPY data ./data
COPY .env.example ./

# Final runtime image
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
# Copy node modules and app source
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/data ./data
COPY package*.json ./

EXPOSE 3000
CMD ["node", "src/server.js"]
