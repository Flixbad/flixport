# 🔧 Résolution : Fichiers de build manquants

## Diagnostic

Le fichier `index.html` n'existe pas dans `/var/www/flixbad.fr/dist/flixdev/`

## Solution

### Étape 1 : Vérifier la structure actuelle

```bash
cd /var/www/flixbad.fr

# Vérifier ce qui existe
ls -la
ls -la dist/
ls -la dist/flixdev/ 2>/dev/null || echo "Le dossier dist/flixdev n'existe pas"
```

### Étape 2 : Vérifier le build

```bash
# Vérifier si le build a été fait
cd /var/www/flixbad.fr

# Voir la structure
find dist -name "index.html" 2>/dev/null

# Si rien n'existe, rebuilder
npm run build:prod
```

### Étape 3 : Vérifier où Angular a créé les fichiers

```bash
# Après le build, vérifier
ls -la dist/
ls -la dist/flixdev/

# Si dist/flixdev n'existe pas mais dist/flixdev/browser existe
ls -la dist/flixdev/browser/ 2>/dev/null
```

### Étape 4 : Ajuster la configuration Nginx si nécessaire

Si les fichiers sont dans `dist/flixdev/browser/` au lieu de `dist/flixdev/`, il faut ajuster Nginx :

```bash
# Éditer la config
sudo nano /etc/nginx/sites-available/flixbad.fr

# Changer la ligne root de :
root /var/www/flixbad.fr/dist/flixdev;

# Vers (si les fichiers sont dans browser/) :
root /var/www/flixbad.fr/dist/flixdev/browser;

# Ou si Angular 17+ a créé une autre structure, vérifier d'abord :
ls -la dist/flixdev/
```

## Solution Complète

```bash
# 1. Aller dans le répertoire
cd /var/www/flixbad.fr

# 2. Vérifier la structure actuelle
ls -la dist/

# 3. Rebuilder
npm run build:prod

# 4. Vérifier où sont les fichiers après le build
find dist -name "index.html" -type f

# 5. Si index.html est dans dist/flixdev/browser/
# Ajuster Nginx :
sudo nano /etc/nginx/sites-available/flixbad.fr
# Changer root vers le bon chemin

# 6. Tester Nginx
sudo nginx -t

# 7. Recharger
sudo systemctl reload nginx
```

