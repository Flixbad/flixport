# 🚀 Déploiement Rapide - FlixDev

## Résumé des Étapes

### 1. Sur votre machine locale

```bash
# Initialiser Git et pousser vers GitHub/GitLab
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE_USERNAME/flixdev.git
git push -u origin main
```

### 2. Sur le VPS (SSH)

```bash
# Se connecter
ssh root@31.97.199.106

# Installer Node.js (si nécessaire)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer Angular CLI
sudo npm install -g @angular/cli

# Créer le répertoire
sudo mkdir -p /var/www/flixbad.fr
sudo chown -R $USER:$USER /var/www/flixbad.fr
cd /var/www/flixbad.fr

# Cloner le repo
git clone https://github.com/VOTRE_USERNAME/flixdev.git .

# Installer et builder
npm install
npm run build:prod

# Configurer Nginx
sudo cp nginx-flixbad.conf /etc/nginx/sites-available/flixbad.fr
sudo ln -s /etc/nginx/sites-available/flixbad.fr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Permissions
sudo chown -R www-data:www-data /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr/dist
```

### 3. Configuration DNS

Assurez-vous que `flixbad.fr` pointe vers `31.97.199.106` (Type A).

### 4. SSL (Optionnel)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d flixbad.fr -d www.flixbad.fr
```

## ✅ Vérification

```bash
# Tester le site
curl http://flixbad.fr

# Vérifier les logs
sudo tail -f /var/log/nginx/flixbad.fr.error.log
```

## 🔄 Mise à jour future

```bash
cd /var/www/flixbad.fr
git pull origin main
npm install
npm run build:prod
sudo systemctl reload nginx
```

