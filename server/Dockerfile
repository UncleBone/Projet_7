# Étape 1 : Build
FROM node:22-alpine AS build
# Installation des dépendances système nécessaires pour Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Génération du client Prisma et build TypeScript
COPY . .
RUN npx prisma generate
RUN npm run build

# Étape 2 : Runtime
FROM node:22-alpine


WORKDIR /app

# On réinstalle openssl et libc6-compat dans l'image finale
RUN apk add --no-cache openssl libc6-compat curl

# Copie uniquement des fichiers nécessaires
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# INSTALLATION PROPRE : On installe UNIQUEMENT les dépendances de prod
RUN npm ci --omit=dev

# Sécurité : Utilisation d'un utilisateur non-root
USER node

EXPOSE 8080

# Utilisation de npx prisma migrate deploy pour appliquer les migrations au démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]