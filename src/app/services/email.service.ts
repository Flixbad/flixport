import { Injectable } from '@angular/core';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

declare var emailjs: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Configuration EmailJS - Clés directement configurées
  private readonly SERVICE_ID = 'service_o6jgj4m';
  private readonly TEMPLATE_ID = 'template_q4zvsag';
  private readonly PUBLIC_KEY = 'gm1UyIEQDoIIYrcYI';

  constructor() {
    // La configuration est chargée depuis emailjs.config.ts
    // EmailJS sera initialisé lors de l'envoi
  }

  async sendContactEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> {
    // Vérifier que EmailJS est chargé
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS n\'est pas chargé');
      return { 
        success: false, 
        error: 'Service d\'envoi d\'email non disponible. Veuillez recharger la page.' 
      };
    }

    // Vérifier que la configuration est présente
    if (!this.SERVICE_ID || !this.TEMPLATE_ID || !this.PUBLIC_KEY) {
      console.error('EmailJS n\'est pas configuré correctement');
      return { 
        success: false, 
        error: 'Configuration EmailJS manquante. Veuillez vérifier la configuration.' 
      };
    }

    try {
      // Initialiser EmailJS avec la clé publique
      if (typeof emailjs !== 'undefined') {
        emailjs.init(this.PUBLIC_KEY);
      }

      const now = new Date();
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'e.buland@outlook.fr',
        reply_to: data.email,
        date: now.toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        date_en: now.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Envoi email avec params:', {
        serviceId: this.SERVICE_ID,
        templateId: this.TEMPLATE_ID,
        params: templateParams
      });

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams
      );

      console.log('Email envoyé avec succès:', response);
      return { success: true, response };
    } catch (error: any) {
      console.error('Erreur complète lors de l\'envoi de l\'email:', error);
      console.error('Détails de l\'erreur:', {
        status: error.status,
        text: error.text,
        message: error.message,
        response: error.response
      });
      
      let errorMessage = 'Erreur lors de l\'envoi de l\'email.';
      
      if (error.status === 400) {
        errorMessage = 'Erreur 400 : Vérifiez que les paramètres du template EmailJS correspondent (from_name, from_email, subject, message, date).';
      } else if (error.status === 401) {
        errorMessage = 'Erreur 401 : Clé publique EmailJS invalide. Vérifiez votre configuration.';
      } else if (error.status === 404) {
        errorMessage = 'Erreur 404 : Service ID ou Template ID introuvable. Vérifiez vos identifiants EmailJS.';
      } else if (error.text) {
        errorMessage = `Erreur EmailJS: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Erreur: ${error.message}`;
      }
      
      return { success: false, error: errorMessage };
    }
  }
}

