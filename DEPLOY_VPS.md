# Guide de Déploiement FlixDev sur VPS

Ce guide vous explique comment déployer votre portfolio FlixDev sur votre VPS avec le domaine **flixbad.fr**.

## 📋 Prérequis

- VPS avec IP : `31.97.199.106`
- Domaine : `flixbad.fr` pointant vers l'IP du VPS
- Accès SSH au VPS
- Git installé sur le VPS
- Nginx installé et configuré
- Node.js et npm installés

## 🚀 Étapes de Déploiement

### 1. Préparer le Repository Git

#### Sur votre machine locale :

```bash
# Initialiser Git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Initial commit - Portfolio FlixDev"

# Créer un repository sur GitHub/GitLab/Bitbucket
# Puis ajouter le remote
git remote add origin https://github.com/VOTRE_USERNAME/flixdev.git

# Pousser le code
git push -u origin main
```

### 2. Configuration DNS

Assurez-vous que votre domaine `flixbad.fr` pointe vers l'IP `31.97.199.106` :

- **Type A** : `flixbad.fr` → `31.97.199.106`
- **Type A** : `www.flixbad.fr` → `31.97.199.106`

Vérifiez avec :
```bash
dig flixbad.fr
# ou
nslookup flixbad.fr
```

### 3. Connexion au VPS

```bash
ssh root@31.97.199.106
# ou
ssh votre-utilisateur@31.97.199.106
```

### 4. Installation des Dépendances sur le VPS

#### Installer Node.js (si pas déjà installé) :

```bash
# Installer Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

#### Installer Angular CLI globalement :

```bash
sudo npm install -g @angular/cli
```

#### Installer Nginx (si pas déjà installé) :

```bash
sudo apt update
sudo apt install -y nginx
```

### 5. Créer le Répertoire du Projet

```bash
# Créer le répertoire
sudo mkdir -p /var/www/flixbad.fr
sudo chown -R $USER:$USER /var/www/flixbad.fr
cd /var/www/flixbad.fr
```

### 6. Cloner le Repository

```bash
# Cloner votre repository Git
git clone https://github.com/VOTRE_USERNAME/flixdev.git .

# Ou si vous avez déjà un repository existant
git pull origin main
```

### 7. Installer les Dépendances et Builder

```bash
# Installer les dépendances
npm install

# Builder pour la production
npm run build:prod
```

Le build créera les fichiers dans `dist/flixdev/`.

### 8. Configuration Nginx

#### Copier la configuration :

```bash
# Copier le fichier de configuration
sudo cp /var/www/flixbad.fr/nginx-flixbad.conf /etc/nginx/sites-available/flixbad.fr
```

#### Modifier le chemin dans la configuration si nécessaire :

Éditez `/etc/nginx/sites-available/flixbad.fr` et vérifiez que le `root` pointe vers :
```
root /var/www/flixbad.fr/dist/flixdev;
```

#### Activer le site :

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/flixbad.fr /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Si tout est OK, recharger Nginx
sudo systemctl reload nginx
```

### 9. Configuration des Permissions

```bash
# Définir les permissions correctes
sudo chown -R www-data:www-data /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr/dist
```

### 10. Configuration SSL (Optionnel mais Recommandé)

#### Installer Certbot :

```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### Obtenir un certificat SSL :

```bash
sudo certbot --nginx -d flixbad.fr -d www.flixbad.fr
```

Certbot configurera automatiquement HTTPS et redirigera HTTP vers HTTPS.

#### Décommenter la section HTTPS dans la config Nginx :

Éditez `/etc/nginx/sites-available/flixbad.fr` et décommentez la section `server` pour le port 443, puis :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 11. Automatisation du Déploiement (Optionnel)

Vous pouvez utiliser le script `deploy-vps.sh` pour automatiser le processus :

```bash
# Rendre le script exécutable
chmod +x /var/www/flixbad.fr/deploy-vps.sh

# Modifier le REPO_URL dans le script
nano /var/www/flixbad.fr/deploy-vps.sh

# Exécuter le script
./deploy-vps.sh
```

### 12. Mise à Jour Future

Pour mettre à jour le site après des modifications :

```bash
cd /var/www/flixbad.fr
git pull origin main
npm install
npm run build:prod
sudo systemctl reload nginx
```

## 🔧 Configuration Multi-Sites

Puisque vous avez déjà d'autres sites sur votre VPS :

- `ultimateboxingleague.fr` (Symfony + Angular)
- `flixbotdev.fr` (autre application)
- `flixbad.fr` (FlixDev - ce portfolio)

Chaque site doit avoir sa propre configuration Nginx dans `/etc/nginx/sites-available/` et un lien symbolique dans `/etc/nginx/sites-enabled/`.

## 📝 Vérification

### Vérifier que Nginx fonctionne :

```bash
sudo systemctl status nginx
```

### Vérifier les logs en cas d'erreur :

```bash
# Logs d'accès
sudo tail -f /var/log/nginx/flixbad.fr.access.log

# Logs d'erreur
sudo tail -f /var/log/nginx/flixbad.fr.error.log
```

### Tester le site :

```bash
curl http://flixbad.fr
```

## 🐛 Dépannage

### Le site ne s'affiche pas :

1. Vérifier que Nginx est démarré : `sudo systemctl status nginx`
2. Vérifier la configuration : `sudo nginx -t`
3. Vérifier les logs : `sudo tail -f /var/log/nginx/error.log`
4. Vérifier que le DNS pointe bien vers l'IP : `dig flixbad.fr`

### Erreur 502 Bad Gateway :

- Vérifier que le build a bien été fait : `ls -la /var/www/flixbad.fr/dist/flixdev`
- Vérifier les permissions : `sudo chown -R www-data:www-data /var/www/flixbad.fr/dist`

### Le routing Angular ne fonctionne pas :

- Vérifier que la configuration Nginx contient bien `try_files $uri $uri/ /index.html;` dans le bloc `location /`

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
- Les logs Nginx
- Les permissions des fichiers
- La configuration DNS
- Que le build s'est bien terminé

## 🎉 C'est Prêt !

Une fois toutes ces étapes terminées, votre portfolio devrait être accessible sur **http://flixbad.fr** (ou **https://flixbad.fr** si vous avez configuré SSL).

