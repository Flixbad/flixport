# 🔧 Résolution Erreur 403 Forbidden

L'erreur 403 signifie que Nginx ne peut pas accéder aux fichiers. Voici comment la résoudre.

## 🔍 Diagnostic

### 1. Vérifier que les fichiers existent

```bash
cd /var/www/flixbad.fr
ls -la dist/flixdev/
```

Vous devriez voir `index.html` dans ce répertoire.

### 2. Vérifier les permissions

```bash
# Vérifier les permissions actuelles
ls -la /var/www/flixbad.fr/dist/flixdev/
ls -la /var/www/flixbad.fr/dist/
ls -la /var/www/flixbad.fr/
```

## ✅ Solution

### Étape 1 : Vérifier le chemin dans Nginx

```bash
# Vérifier la configuration Nginx
sudo cat /etc/nginx/sites-available/flixbad.fr | grep root
```

Le `root` doit pointer vers : `/var/www/flixbad.fr/dist/flixdev`

### Étape 2 : Corriger les permissions

```bash
# Définir les bonnes permissions
sudo chown -R www-data:www-data /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr
sudo chmod -R 755 /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr/dist/flixdev

# Vérifier que index.html est lisible
sudo chmod 644 /var/www/flixbad.fr/dist/flixdev/index.html
```

### Étape 3 : Vérifier que le build a bien créé les fichiers

```bash
cd /var/www/flixbad.fr
ls -la dist/flixdev/

# Si le dossier est vide ou n'existe pas, rebuilder
npm run build:prod
```

### Étape 4 : Vérifier la configuration Nginx

```bash
# Vérifier la syntaxe
sudo nginx -t

# Vérifier que le site est activé
ls -la /etc/nginx/sites-enabled/ | grep flixbad

# Si le site n'est pas activé
sudo ln -s /etc/nginx/sites-available/flixbad.fr /etc/nginx/sites-enabled/
```

### Étape 5 : Recharger Nginx

```bash
sudo systemctl reload nginx
# ou
sudo systemctl restart nginx
```

## 🔍 Vérifications supplémentaires

### Vérifier les logs Nginx

```bash
# Logs d'erreur
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/flixbad.fr.error.log

# Logs d'accès
sudo tail -f /var/log/nginx/flixbad.fr.access.log
```

### Vérifier que SELinux n'est pas actif (si applicable)

```bash
# Vérifier si SELinux est actif
getenforce

# Si c'est "Enforcing", le désactiver temporairement pour tester
sudo setenforce 0
```

## 🎯 Solution Complète (Copier-Coller)

```bash
# 1. Aller dans le répertoire
cd /var/www/flixbad.fr

# 2. Vérifier que le build existe
ls -la dist/flixdev/index.html

# 3. Si le build n'existe pas, rebuilder
npm run build:prod

# 4. Corriger les permissions
sudo chown -R www-data:www-data /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr
sudo chmod -R 755 /var/www/flixbad.fr/dist
sudo chmod -R 755 /var/www/flixbad.fr/dist/flixdev

# 5. Vérifier la configuration Nginx
sudo nginx -t

# 6. Vérifier que le site est activé
sudo ls -la /etc/nginx/sites-enabled/ | grep flixbad

# 7. Si pas activé, activer
sudo ln -s /etc/nginx/sites-available/flixbad.fr /etc/nginx/sites-enabled/

# 8. Recharger Nginx
sudo systemctl reload nginx

# 9. Tester
curl -I http://flixbad.fr
```

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier le chemin exact dans la config Nginx

```bash
# Éditer la configuration
sudo nano /etc/nginx/sites-available/flixbad.fr

# Vérifier que la ligne "root" pointe vers :
root /var/www/flixbad.fr/dist/flixdev;

# Sauvegarder (Ctrl+O, Enter, Ctrl+X)
# Tester
sudo nginx -t
sudo systemctl reload nginx
```

### Vérifier les permissions du répertoire parent

```bash
# S'assurer que tous les répertoires parents sont accessibles
sudo chmod 755 /var
sudo chmod 755 /var/www
sudo chmod 755 /var/www/flixbad.fr
```

