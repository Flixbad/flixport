import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../components/icons/icons.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="contact-page">
      <section class="contact-hero section">
        <div class="container">
          <div class="hero-content" appScrollAnimation>
            <h1>{{ 'contact.title' | translate }}</h1>
            <p class="subtitle">
              {{ 'contact.subtitle' | translate }}
            </p>
          </div>
        </div>
      </section>

      <section class="contact-section section">
        <div class="container">
          <div class="contact-content">
            <div class="contact-info" appScrollAnimation>
              <h2>{{ 'contact.info.title' | translate }}</h2>
              <p class="info-text">
                {{ 'contact.info.desc' | translate }}
              </p>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon"><app-icon name="email" size="32"></app-icon></div>
                  <div class="method-content">
                    <h3>Email</h3>
                    <a href="mailto:e.buland&#64;outlook.fr">e.buland&#64;outlook.fr</a>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon"><app-icon name="briefcase" size="32"></app-icon></div>
                  <div class="method-content">
                    <h3>LinkedIn</h3>
                    <a href="#" target="_blank">linkedin.com/in/flixdev</a>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon"><app-icon name="github" size="32"></app-icon></div>
                  <div class="method-content">
                    <h3>GitHub</h3>
                    <a href="#" target="_blank">github.com/flixdev</a>
                  </div>
                </div>
              </div>

              <div class="availability">
                <div class="status-indicator">
                  <span class="status-dot"></span>
                  <span>{{ 'contact.availability' | translate }}</span>
                </div>
              </div>
            </div>

            <div class="contact-form-container" appScrollAnimation>
              <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="form-group">
                  <label for="name">{{ 'contact.form.name' | translate }}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    [placeholder]="'contact.form.name' | translate">
                </div>

                <div class="form-group">
                  <label for="email">{{ 'contact.form.email' | translate }}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    placeholder="votre@email.com">
                </div>

                <div class="form-group">
                  <label for="subject">{{ 'contact.form.subject' | translate }}</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    [(ngModel)]="formData.subject"
                    required
                    [placeholder]="'contact.form.subject' | translate">
                </div>

                <div class="form-group">
                  <label for="message">{{ 'contact.form.message' | translate }}</label>
                  <textarea 
                    id="message" 
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    rows="6"
                    [placeholder]="'contact.form.message' | translate"></textarea>
                </div>

                <button 
                  type="submit" 
                  class="submit-btn"
                  [disabled]="!contactForm.valid || isSubmitting">
                  <span *ngIf="!isSubmitting">{{ 'contact.form.submit' | translate }}</span>
                  <span *ngIf="isSubmitting">{{ 'contact.form.submitting' | translate }}</span>
                </button>

                <div *ngIf="submitMessage" class="submit-message" [class.success]="submitSuccess" [class.error]="!submitSuccess">
                  {{ submitMessage }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .contact-page {
      width: 100%;
    }

    .contact-hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0 80px;
      text-align: center;
    }

    .contact-hero h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.8;
    }

    .contact-section {
      background: var(--bg-card);
      padding: 80px 0;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 4rem;
      align-items: start;
    }

    .contact-info h2 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      font-size: 2rem;
    }

    .info-text {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 3rem;
      font-size: 1.05rem;
    }

    .contact-methods {
      margin-bottom: 3rem;
    }

    .contact-method {
      display: flex;
      align-items: start;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--bg-dark);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .contact-method::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s;
    }

    .contact-method:hover::before {
      left: 100%;
    }

    .contact-method:hover {
      border-color: var(--primary-color);
      transform: translateX(10px) scale(1.02);
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.2);
    }

    .contact-method:hover .method-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .method-icon {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .method-icon {
      flex-shrink: 0;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .method-content h3 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .method-content a {
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .method-content a:hover {
      color: var(--gaming-cyan);
    }

    .availability {
      padding: 1.5rem;
      background: var(--bg-dark);
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary);
    }

    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--success-color);
      box-shadow: 0 0 10px var(--success-color);
      animation: pulse 2s ease-in-out infinite;
    }

    .contact-form-container {
      background: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2.5rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.95rem;
    }

    .form-group input,
    .form-group textarea {
      background: var(--bg-darker);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 12px 16px;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2);
      transform: translateY(-2px);
      background: var(--bg-card);
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: var(--text-muted);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      color: var(--text-primary);
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      position: relative;
      overflow: hidden;
    }

    .submit-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .submit-btn:hover:not(:disabled)::before {
      width: 300px;
      height: 300px;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .submit-message {
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
    }

    .submit-message.success {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
      border: 1px solid var(--success-color);
    }

    .submit-message.error {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error-color);
      border: 1px solid var(--error-color);
    }

    @media (max-width: 968px) {
      .contact-content {
        grid-template-columns: 1fr;
      }

      .contact-hero h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private translationService: TranslationService,
    private emailService: EmailService
  ) {}

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      const result = await this.emailService.sendContactEmail({
        name: this.formData.name,
        email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message
      });

      this.isSubmitting = false;

      if (result.success) {
        this.submitSuccess = true;
        this.submitMessage = this.translationService.instant('contact.form.success');
        
        // Réinitialiser le formulaire
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };

        // Masquer le message après 5 secondes
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      } else {
        this.submitSuccess = false;
        this.submitMessage = this.translationService.instant('contact.form.error') || 'Erreur lors de l\'envoi. Veuillez réessayer.';
        
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }
    } catch (error) {
      this.isSubmitting = false;
      this.submitSuccess = false;
      this.submitMessage = this.translationService.instant('contact.form.error') || 'Erreur lors de l\'envoi. Veuillez réessayer.';
      
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }
  }
}

