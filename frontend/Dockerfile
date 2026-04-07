# -------- Build Stage --------
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# -------- Runtime Stage --------
FROM node:18-alpine

WORKDIR /app

# serve installieren (leichtgewichtiger static server)
RUN npm install -g serve

# Build übernehmen
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]