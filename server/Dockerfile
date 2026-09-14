# Étape 1 : Build
FROM node:22-alpine AS build
# Mise à jour de npm pour corriger ses propres failles de sécurité
RUN npm install -g npm@latest
# Installation des dépendances système nécessaires pour Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Étape 2 : Runtime
FROM node:22-alpine
# Mise à jour de npm pour corriger ses propres failles de sécurité
RUN npm install -g npm@latest

WORKDIR /app

# On réinstalle openssl et libc6-compat dans l'image finale
RUN apk add --no-cache openssl libc6-compat curl

# Copie uniquement des fichiers nécessaires
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# INSTALLATION PROPRE : On installe UNIQUEMENT les dépendances de prod
RUN npm ci --omit=dev

# Régénération du client Prisma pour l'environnement de prod
RUN npx prisma generate

# CHOWN : On donne la propriété du dossier /app à l'utilisateur non-root "node"
RUN chown -R node:node /app

# Sécurité : Utilisation d'un utilisateur non-root
USER node

EXPOSE 8080

# Utilisation de npx prisma migrate deploy pour appliquer les migrations au démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]