# Schritt 1: Verwende Node.js für den Build-Prozess
FROM node:18 AS build

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json Dateien, um Abhängigkeiten zu installieren
COPY package*.json ./

# Installiere Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Baue die Anwendung für die Produktion
RUN npm run build

# Schritt 2: Verwende Nginx, um die Anwendung bereitzustellen
FROM nginx:stable-alpine

# Kopiere die Build-Ausgabe nach Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Standardmäßig lauscht Nginx auf Port 80
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
