# Step 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run with production server
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

# optional: if using next start
ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "run", "start"]
