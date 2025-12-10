# Configuration EmailJS

Ce guide vous explique comment configurer EmailJS pour recevoir les emails du formulaire de contact.

## Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (100 emails/mois gratuits)
3. Connectez-vous à votre compte

### 2. Créer un service Email

1. Dans le dashboard EmailJS, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte email **e.buland@outlook.fr**
5. Notez le **Service ID** généré service_o6jgj4m

### 3. Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Utilisez le template suivant :

**Sujet de l'email :**
```
Nouveau message depuis FlixDev Portfolio - {{subject}}
```

**Corps de l'email (HTML) :**

> 💡 **Astuce** : Vous pouvez copier le contenu du fichier `email-template.html` qui contient le template complet et prêt à l'emploi.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #0f172a;
      background: #f8fafc;
      margin: 0;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px;
    }
    .info-section {
      background: #f1f5f9;
      border-left: 4px solid #00d4ff;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info-row {
      display: flex;
      margin-bottom: 12px;
      align-items: start;
    }
    .info-label {
      font-weight: 600;
      color: #475569;
      min-width: 100px;
      font-size: 14px;
    }
    .info-value {
      color: #0f172a;
      flex: 1;
      font-size: 14px;
    }
    .message-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      color: #0f172a;
      white-space: pre-wrap;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.8;
    }
    .email-footer {
      background: #0a0e27;
      color: #9ca3af;
      padding: 20px;
      text-align: center;
      font-size: 12px;
    }
    .email-footer a {
      color: #00d4ff;
      text-decoration: none;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #00d4ff, #7c3aed);
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 8px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>💻 Nouveau Message Portfolio</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">FlixDev Portfolio</p>
    </div>
    
    <div class="email-body">
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">👤 Nom :</span>
          <span class="info-value">{{from_name}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📧 Email :</span>
          <span class="info-value">
            <a href="mailto:{{from_email}}" style="color: #00d4ff; text-decoration: none;">{{from_email}}</a>
          </span>
        </div>
        <div class="info-row">
          <span class="info-label">📅 Date :</span>
          <span class="info-value">{{date}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📌 Sujet :</span>
          <span class="info-value">{{subject}}<span class="badge">Nouveau</span></span>
        </div>
      </div>
      
      <div style="margin: 30px 0;">
        <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 18px;">
          💬 Message :
        </h3>
        <div class="message-box">
{{message}}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="mailto:{{from_email}}?subject=Re: {{subject}}" 
           style="display: inline-block; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: #ffffff; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          ✉️ Répondre par email
        </a>
      </div>
    </div>
    
    <div class="email-footer">
      <p>Message envoyé depuis le portfolio <strong>FlixDev</strong></p>
      <p style="margin-top: 10px;">
        <a href="https://flixdev.fr">flixdev.fr</a>
      </p>
    </div>
  </div>
</body>
</html>
```

4. Cliquez sur **Save**
5. Notez le **Template ID** généré template_q4zvsag

### 4. Obtenir votre Public Key

1. Allez dans **Account** > **General**
2. Copiez votre **Public Key** gm1UyIEQDoIIYrcYI

### 5. Configurer le code

1. Ouvrez le fichier `src/app/services/email.service.ts`
2. Remplacez les valeurs suivantes :
   - `YOUR_SERVICE_ID` par votre Service ID
   - `YOUR_TEMPLATE_ID` par votre Template ID
   - `YOUR_PUBLIC_KEY` par votre Public Key

3. Ouvrez le fichier `src/index.html`
4. Remplacez `YOUR_PUBLIC_KEY` dans le script par votre Public Key

### 6. Variables du template

Le template utilise ces variables :
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message
- `{{date}}` - Date et heure d'envoi
- `{{to_email}}` - Email de destination (e.buland@outlook.fr)
- `{{reply_to}}` - Email pour répondre

### 7. Tester

1. Lancez l'application : `npm start`
2. Allez sur la page Contact
3. Remplissez et envoyez le formulaire
4. Vérifiez votre boîte email **e.buland@outlook.fr**

## Notes importantes

- Le compte gratuit EmailJS permet 200 emails/mois
- Les emails sont envoyés depuis votre compte connecté
- Vous pouvez personnaliser le template d'email dans le dashboard EmailJS
- Le design de l'email est responsive et s'affiche bien sur mobile

## Alternative : Backend personnalisé

Si vous préférez utiliser votre propre backend, vous pouvez :
1. Créer une API endpoint sur votre serveur
2. Modifier `email.service.ts` pour appeler votre API
3. Envoyer les emails via Node.js avec nodemailer ou un service similaire

