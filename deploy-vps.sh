#!/bin/bash

# Script de déploiement pour FlixDev sur VPS
# Usage: ./deploy-vps.sh
# À exécuter sur le VPS après avoir cloné le repository

set -e

echo "🚀 Déploiement de FlixDev sur VPS..."

# Variables
PROJECT_DIR="/var/www/flixbad.fr"
REPO_URL="https://github.com/VOTRE_USERNAME/flixdev.git"  # À modifier avec votre repo Git
BRANCH="main"  # ou "master" selon votre branche principale

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installation en cours..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Vérifier si Angular CLI est installé globalement
if ! command -v ng &> /dev/null; then
    echo "📦 Installation d'Angular CLI globalement..."
    sudo npm install -g @angular/cli
fi

# Créer le répertoire si il n'existe pas
if [ ! -d "$PROJECT_DIR" ]; then
    echo "📁 Création du répertoire $PROJECT_DIR..."
    sudo mkdir -p "$PROJECT_DIR"
    sudo chown -R $USER:$USER "$PROJECT_DIR"
fi

# Aller dans le répertoire du projet
cd "$PROJECT_DIR"

# Si c'est la première fois, cloner le repository
if [ ! -d ".git" ]; then
    echo "📥 Clonage du repository Git..."
    git clone "$REPO_URL" .
else
    echo "🔄 Mise à jour du repository Git..."
    git fetch origin
    git reset --hard origin/$BRANCH
    git clean -fd
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --production=false

# Build de production
echo "🔨 Build de production en cours..."
npm run build:prod

# Vérifier que le build a réussi
if [ ! -d "dist/flixdev" ]; then
    echo "❌ Erreur: Le dossier dist/flixdev n'existe pas"
    exit 1
fi

# Copier les fichiers vers le répertoire de déploiement
echo "📤 Copie des fichiers..."
sudo cp -r dist/flixdev/* "$PROJECT_DIR/dist/flixdev/" 2>/dev/null || sudo mkdir -p "$PROJECT_DIR/dist/flixdev" && sudo cp -r dist/flixdev/* "$PROJECT_DIR/dist/flixdev/"

# Définir les permissions
echo "🔐 Configuration des permissions..."
sudo chown -R www-data:www-data "$PROJECT_DIR/dist"
sudo chmod -R 755 "$PROJECT_DIR/dist"

# Tester la configuration Nginx
echo "🔍 Vérification de la configuration Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "🔄 Rechargement de Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx rechargé avec succès!"
else
    echo "❌ Erreur dans la configuration Nginx. Veuillez vérifier."
    exit 1
fi

echo "🎉 Déploiement terminé avec succès!"
echo "🌐 Votre site est accessible sur http://flixbad.fr"

