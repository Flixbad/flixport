# Dépannage EmailJS - Erreur 400

L'erreur 400 indique généralement que les paramètres envoyés ne correspondent pas aux variables définies dans votre template EmailJS.

## Vérification du template EmailJS

### 1. Vérifier les variables dans votre template

Dans votre dashboard EmailJS, ouvrez votre template (`template_q4zvsag`) et vérifiez que vous utilisez exactement ces variables :

**Variables requises :**
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message
- `{{date}}` - Date et heure (optionnel)
- `{{to_email}}` - Email de destination (optionnel)
- `{{reply_to}}` - Email pour répondre (optionnel)

### 2. Vérifier le sujet de l'email

Le sujet de votre template doit utiliser `{{subject}}` :

```
Nouveau message depuis FlixDev Portfolio - {{subject}}
```

### 3. Vérifier le corps de l'email

Assurez-vous que votre template HTML utilise bien toutes les variables nécessaires. Voici un exemple minimal qui fonctionne :

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h2>Nouveau message depuis FlixDev Portfolio</h2>
  
  <p><strong>Nom :</strong> {{from_name}}</p>
  <p><strong>Email :</strong> {{from_email}}</p>
  <p><strong>Sujet :</strong> {{subject}}</p>
  <p><strong>Date :</strong> {{date}}</p>
  
  <h3>Message :</h3>
  <p>{{message}}</p>
</body>
</html>
```

### 4. Vérifier les paramètres de service

Dans votre service EmailJS (`service_o6jgj4m`), vérifiez que :
- Le service est bien connecté à votre compte Outlook
- Le service est actif
- Les permissions sont correctement configurées

### 5. Test rapide

Pour tester rapidement, vous pouvez utiliser ce template minimal dans EmailJS :

**Sujet :**
```
Test - {{subject}}
```

**Corps (HTML) :**
```html
<p>Nom: {{from_name}}</p>
<p>Email: {{from_email}}</p>
<p>Sujet: {{subject}}</p>
<p>Message: {{message}}</p>
```

Si ce template minimal fonctionne, le problème vient du design de votre template. Si ça ne fonctionne toujours pas, vérifiez vos identifiants.

## Vérification des identifiants

Vérifiez dans `src/app/config/emailjs.config.ts` que vous avez bien configuré vos identifiants :

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_o6jgj4m',      // Votre Service ID
  TEMPLATE_ID: 'template_q4zvsag',    // Votre Template ID
  PUBLIC_KEY: 'gm1UyIEQDoIIYrcYI'     // Votre Public Key
};
```

**Important :** Si vous voyez encore `'YOUR_SERVICE_ID'`, `'YOUR_TEMPLATE_ID'` ou `'YOUR_PUBLIC_KEY'`, cela signifie que la configuration n'est pas terminée. Remplacez ces valeurs par vos vrais identifiants EmailJS.

## Console du navigateur

Ouvrez la console du navigateur (F12) et regardez les logs. Vous devriez voir :
- Les paramètres envoyés
- L'erreur détaillée d'EmailJS

## Solutions courantes

### Problème : Variables manquantes
**Solution :** Assurez-vous que toutes les variables utilisées dans le template sont envoyées dans `templateParams`.

### Problème : Nom de variable incorrect
**Solution :** Les noms de variables sont sensibles à la casse. Utilisez exactement `{{from_name}}` et non `{{fromName}}` ou `{{FROM_NAME}}`.

### Problème : Template non sauvegardé
**Solution :** Assurez-vous d'avoir cliqué sur "Save" après avoir modifié votre template.

### Problème : Service non connecté
**Solution :** Vérifiez dans EmailJS > Email Services que votre service est bien connecté et actif.

## Test manuel

Vous pouvez tester directement depuis le dashboard EmailJS :
1. Allez dans Email Templates
2. Ouvrez votre template
3. Cliquez sur "Test" ou "Send Test Email"
4. Remplissez les variables manuellement
5. Envoyez un email de test

Si le test fonctionne, le problème vient du code. Si le test ne fonctionne pas, le problème vient de la configuration EmailJS.

## Contact support

Si le problème persiste :
1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs dans le dashboard EmailJS
3. Contactez le support EmailJS si nécessaire

