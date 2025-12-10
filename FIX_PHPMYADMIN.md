# 🔧 Résolution du Problème phpMyAdmin

Le problème vient de phpMyAdmin qui essaie de se configurer mais ne peut pas se connecter à MySQL.

## Solution Rapide

### Option 1 : Ignorer phpMyAdmin (recommandé si vous ne l'utilisez pas)

```bash
# Annuler la configuration de phpMyAdmin
sudo dpkg --configure -a

# Si ça ne fonctionne pas, supprimer phpMyAdmin
sudo apt remove --purge phpmyadmin
sudo apt autoremove
```

### Option 2 : Configurer phpMyAdmin correctement

Si vous avez besoin de phpMyAdmin :

```bash
# 1. Vérifier que MySQL/MariaDB fonctionne
sudo systemctl status mysql
# ou
sudo systemctl status mariadb

# 2. Se connecter à MySQL pour créer un utilisateur
sudo mysql -u root

# Dans MySQL, créer un utilisateur pour phpMyAdmin :
CREATE USER 'phpmyadmin'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;

# 3. Reconfigurer phpMyAdmin
sudo dpkg-reconfigure phpmyadmin
```

### Option 3 : Réparer le paquet cassé

```bash
# Forcer la réparation
sudo dpkg --configure -a

# Si ça bloque toujours, forcer la suppression
sudo dpkg --remove --force-remove-reinstreq phpmyadmin
sudo apt-get install -f
```

## Continuer avec Certbot

Une fois phpMyAdmin résolu, vous pourrez continuer avec Certbot :

```bash
sudo certbot --nginx -d flixbad.fr -d www.flixbad.fr
```

