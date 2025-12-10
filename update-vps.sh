#!/bin/bash

# Script de mise à jour pour FlixDev sur VPS
# Usage: ./update-vps.sh

set -e

echo "🔄 Mise à jour de FlixDev sur VPS..."

PROJECT_DIR="/var/www/flixbad.fr"

cd "$PROJECT_DIR"

# Mettre à jour depuis Git
echo "📥 Mise à jour depuis Git..."
git pull origin main

# Installer/mettre à jour les dépendances
echo "📦 Mise à jour des dépendances..."
npm install

# Corriger les vulnérabilités (optionnel, peut causer des breaking changes)
echo "🔒 Vérification des vulnérabilités..."
npm audit fix || echo "⚠️ Certaines vulnérabilités nécessitent une attention manuelle"

# Build de production
echo "🔨 Build de production en cours..."
npm run build:prod

# Vérifier que le build a réussi
if [ ! -d "dist/flixdev" ]; then
    echo "❌ Erreur: Le dossier dist/flixdev n'existe pas"
    exit 1
fi

# Définir les permissions
echo "🔐 Configuration des permissions..."
sudo chown -R www-data:www-data "$PROJECT_DIR/dist"
sudo chmod -R 755 "$PROJECT_DIR/dist"

# Recharger Nginx
echo "🔄 Rechargement de Nginx..."
sudo systemctl reload nginx

echo "✅ Mise à jour terminée avec succès!"

