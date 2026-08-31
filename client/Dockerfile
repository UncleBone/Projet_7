# Étape 1 : Build
FROM node:22-alpine AS build
# Mise à jour de npm pour corriger ses propres failles de sécurité
RUN npm install -g npm@latest

WORKDIR /app

# Installation des dépendances (optimisation du cache)
COPY package*.json ./
RUN npm ci

# Copie du code source et build
COPY . .
RUN npm run build

# Étape 2 : Runtime (Production)
FROM nginx:stable-alpine

# Copie des fichiers compilés depuis l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration Nginx pour gérer le routage SPA (React Router)
RUN echo 'server { \
    listen 4200; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]