# Guide de déploiement - FlixDev

Ce guide explique comment déployer le portfolio FlixDev sur votre VPS.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Accès SSH à votre VPS

## Étapes de déploiement

### 1. Build de production

Sur votre machine locale ou directement sur le VPS :

```bash
npm install
npm run build:prod
```

Les fichiers compilés seront dans le dossier `dist/flixdev/`

### 2. Options de déploiement

#### Option A : Apache

1. Copiez le contenu de `dist/flixdev/` vers votre répertoire web Apache (ex: `/var/www/flixdev/`)
2. Copiez le fichier `.htaccess` dans le même répertoire
3. Configurez votre virtual host Apache pour pointer vers ce répertoire

Exemple de configuration Apache :

```apache
<VirtualHost *:80>
    ServerName flixdev.votre-domaine.com
    DocumentRoot /var/www/flixdev
    
    <Directory /var/www/flixdev>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Option B : Nginx

1. Copiez le contenu de `dist/flixdev/` vers votre répertoire web (ex: `/var/www/flixdev/`)
2. Utilisez le fichier `nginx.conf.example` comme base pour votre configuration
3. Adaptez les chemins et le nom de domaine
4. Testez la configuration : `nginx -t`
5. Rechargez Nginx : `systemctl reload nginx`

#### Option C : Sous-dossier (si déjà hébergé avec Symfony/Angular)

Si vous avez déjà des applications sur le VPS, vous pouvez déployer FlixDev dans un sous-dossier :

1. Copiez le contenu de `dist/flixdev/` vers un sous-dossier (ex: `/var/www/portfolio/`)
2. Configurez votre serveur web pour servir ce sous-dossier
3. Assurez-vous que le `baseHref` dans `angular.json` correspond au chemin

Pour un sous-dossier, modifiez `angular.json` :

```json
"build": {
  "options": {
    "baseHref": "/portfolio/",
    ...
  }
}
```

Puis rebuild : `npm run build:prod`

### 3. Configuration du serveur

#### Variables d'environnement

Si vous avez besoin de variables d'environnement, créez un fichier `src/environments/environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://votre-api.com'
};
```

#### HTTPS (Recommandé)

Pour activer HTTPS avec Let's Encrypt :

```bash
sudo certbot --nginx -d votre-domaine.com
# ou
sudo certbot --apache -d votre-domaine.com
```

## Maintenance

### Mise à jour

1. Récupérez les dernières modifications
2. Installez les dépendances : `npm install`
3. Rebuild : `npm run build:prod`
4. Copiez les nouveaux fichiers vers le serveur
5. Videz le cache du navigateur si nécessaire

### Logs

Vérifiez les logs de votre serveur web en cas de problème :

- Apache : `/var/log/apache2/error.log`
- Nginx : `/var/log/nginx/error.log`

## Dépannage

### Les routes ne fonctionnent pas

Assurez-vous que la configuration de réécriture d'URL est correcte (`.htaccess` pour Apache ou configuration Nginx).

### Erreurs 404

Vérifiez que tous les fichiers de `dist/flixdev/` ont été copiés correctement.

### Problèmes de permissions

```bash
sudo chown -R www-data:www-data /var/www/flixdev
sudo chmod -R 755 /var/www/flixdev
```




