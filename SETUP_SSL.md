# 🔒 Configuration SSL/HTTPS pour flixbad.fr

Le site affiche "Non sécurisé" car il fonctionne en HTTP. Il faut configurer HTTPS avec un certificat SSL.

## ✅ Solution : Configurer Certbot

### Étape 1 : Résoudre le problème phpMyAdmin (si bloqué)

```bash
# Option 1 : Ignorer phpMyAdmin
sudo dpkg --configure -a
# Appuyez sur "Ok" si un menu s'affiche

# Option 2 : Supprimer phpMyAdmin si vous ne l'utilisez pas
sudo apt remove --purge phpmyadmin
sudo apt autoremove
sudo apt-get install -f
```

### Étape 2 : Installer Certbot (si pas déjà fait)

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

### Étape 3 : Obtenir le certificat SSL

```bash
# Lancer Certbot pour obtenir le certificat
sudo certbot --nginx -d flixbad.fr -d www.flixbad.fr
```

Certbot va :
1. Vérifier que le domaine pointe vers votre VPS
2. Obtenir un certificat Let's Encrypt gratuit
3. Configurer automatiquement Nginx pour HTTPS
4. Rediriger HTTP vers HTTPS

### Étape 4 : Vérifier la configuration

```bash
# Tester la configuration Nginx
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx

# Tester HTTPS
curl -I https://flixbad.fr
```

### Étape 5 : Vérifier le renouvellement automatique

Certbot configure automatiquement le renouvellement. Vérifiez :

```bash
# Tester le renouvellement
sudo certbot renew --dry-run
```

## 🔍 Si Certbot échoue

### Erreur : "Domain does not point to this server"

Vérifiez le DNS :
```bash
dig flixbad.fr
# Doit retourner 31.97.199.106
```

### Erreur : "Port 80 is already in use"

Vérifiez que Nginx écoute sur le port 80 :
```bash
sudo netstat -tulpn | grep :80
sudo systemctl status nginx
```

### Erreur : "Connection refused"

Vérifiez le firewall :
```bash
# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

## 📝 Configuration manuelle (si Certbot ne fonctionne pas)

Si Certbot ne configure pas automatiquement, vous pouvez le faire manuellement :

1. Obtenir le certificat :
```bash
sudo certbot certonly --standalone -d flixbad.fr -d www.flixbad.fr
```

2. Éditer la configuration Nginx :
```bash
sudo nano /etc/nginx/sites-available/flixbad.fr
```

3. Décommenter et activer la section HTTPS dans le fichier `nginx-flixbad.conf`

4. Recharger Nginx :
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ Vérification finale

Après configuration, le site devrait :
- ✅ Afficher un cadenas vert dans le navigateur
- ✅ Fonctionner en HTTPS
- ✅ Rediriger automatiquement HTTP → HTTPS

Testez : https://flixbad.fr

