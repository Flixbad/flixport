import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="legal-page">
      <section class="legal-hero section">
        <div class="container">
          <div class="hero-content" appScrollAnimation>
            <h1>{{ 'legal.title' | translate }}</h1>
            <p class="subtitle">{{ 'legal.subtitle' | translate }}</p>
          </div>
        </div>
      </section>

      <section class="legal-section section">
        <div class="container">
          <div class="legal-block" appScrollAnimation>
            <h2>{{ 'legal.identity.title' | translate }}</h2>
            <p>{{ 'legal.identity.content' | translate }}</p>
          </div>

          <div class="legal-block" appScrollAnimation>
            <h2>{{ 'legal.hosting.title' | translate }}</h2>
            <p>{{ 'legal.hosting.content' | translate }}</p>
          </div>

          <div class="legal-block" appScrollAnimation>
            <h2>{{ 'legal.rgpd.title' | translate }}</h2>
            <p>{{ 'legal.rgpd.content' | translate }}</p>
          </div>

          <div class="legal-block" appScrollAnimation>
            <h2>{{ 'legal.cookies.title' | translate }}</h2>
            <p>{{ 'legal.cookies.content' | translate }}</p>
          </div>

          <div class="legal-block" appScrollAnimation>
            <h2>{{ 'legal.analytics.title' | translate }}</h2>
            <p>{{ 'legal.analytics.content' | translate }}</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .legal-page {
      width: 100%;
    }

    .legal-hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0 80px;
      text-align: center;
    }

    .legal-hero h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.8;
    }

    .legal-section {
      background: var(--bg-card);
      padding: 80px 0;
    }

    .legal-block {
      background: var(--bg-dark);
      border-radius: 16px;
      border: 1px solid var(--border-color);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .legal-block h2 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .legal-block p {
      color: var(--text-secondary);
      line-height: 1.8;
      white-space: pre-line;
    }

    @media (max-width: 768px) {
      .legal-hero h1 {
        font-size: 2.3rem;
      }

      .legal-block {
        padding: 1.5rem;
      }
    }
  `]
})
export class LegalComponent {}