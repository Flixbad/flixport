#!/bin/bash

# Script de déploiement pour FlixDev
# Usage: ./deploy.sh [destination]

set -e

echo "🚀 Déploiement de FlixDev..."

# Build de production
echo "📦 Build en cours..."
npm run build:prod

# Vérifier que le build a réussi
if [ ! -d "dist/flixdev" ]; then
    echo "❌ Erreur: Le dossier dist/flixdev n'existe pas"
    exit 1
fi

echo "✅ Build terminé avec succès!"

# Si une destination est fournie, copier les fichiers
if [ -n "$1" ]; then
    echo "📤 Copie vers $1..."
    cp -r dist/flixdev/* "$1"
    echo "✅ Fichiers copiés vers $1"
fi

echo "🎉 Déploiement terminé!"




