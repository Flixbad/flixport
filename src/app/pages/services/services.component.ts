import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icons/icons.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="services-page">
      <section class="services-hero section">
        <div class="container">
          <div class="hero-content" appScrollAnimation>
            <h1>{{ 'services.title' | translate }}</h1>
            <p class="subtitle">
              {{ 'services.subtitle' | translate }}
            </p>
          </div>
        </div>
      </section>

      <section class="services-section section">
        <div class="container">
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of services; let i = index" appScrollAnimation [style.animation-delay]="(i * 0.1) + 's'">
              <div class="service-icon">
                <app-icon [name]="service.icon" size="48"></app-icon>
              </div>
              <h3>{{ service.title | translate }}</h3>
              <p>{{ service.description | translate }}</p>
              <ul class="service-features">
                <li *ngFor="let feature of service.features">
                  <app-icon name="code" size="16"></app-icon>
                  <span>{{ feature | translate }}</span>
                </li>
              </ul>
              <div class="service-price" *ngIf="service.price">
                <span class="price-amount">{{ service.price }}</span>
                <span class="price-note">{{ 'services.price.note' | translate }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="process-section section">
        <div class="container">
          <h2 class="section-title" appScrollAnimation>{{ 'services.process.title' | translate }}</h2>
          <div class="process-timeline">
            <div class="process-step" *ngFor="let step of processSteps; let i = index" appScrollAnimation [style.animation-delay]="(i * 0.15) + 's'">
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title | translate }}</h3>
                <p>{{ step.description | translate }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .services-page {
      width: 100%;
    }

    .services-hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0 80px;
      text-align: center;
    }

    .services-hero h1 {
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

    .services-section {
      background: var(--bg-card);
      padding: 80px 0;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 2.5rem;
      text-align: center;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s;
    }

    .service-card:hover::before {
      left: 100%;
    }

    .service-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: var(--primary-color);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
    }

    .service-icon {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .service-card:hover .service-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .service-card h3 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .service-card p {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .service-features {
      list-style: none;
      text-align: left;
      margin-bottom: 2rem;
    }

    .service-features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }

    .service-features li app-icon {
      color: var(--primary-color);
      flex-shrink: 0;
    }

    .service-price {
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
      margin-top: auto;
    }

    .price-amount {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 0.5rem;
    }

    .price-note {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .process-section {
      background: var(--bg-dark);
      padding: 80px 0;
    }

    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      font-size: 2.5rem;
    }

    .process-timeline {
      max-width: 800px;
      margin: 0 auto;
    }

    .process-step {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;
      align-items: start;
    }

    .step-number {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .process-step:hover .step-number {
      transform: scale(1.1) rotate(5deg);
    }

    .step-content {
      flex: 1;
      padding-top: 0.5rem;
    }

    .step-content h3 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .step-content p {
      color: var(--text-secondary);
      line-height: 1.8;
    }

    @media (max-width: 768px) {
      .services-hero h1 {
        font-size: 2.5rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .process-step {
        flex-direction: column;
        text-align: center;
      }

      .step-number {
        margin: 0 auto;
      }
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      icon: 'code' as const,
      title: 'services.web.title',
      description: 'services.web.description',
      features: [
        'services.web.feature1',
        'services.web.feature2',
        'services.web.feature3',
        'services.web.feature4'
      ],
      price: null
    },
    {
      icon: 'rocket' as const,
      title: 'services.fullstack.title',
      description: 'services.fullstack.description',
      features: [
        'services.fullstack.feature1',
        'services.fullstack.feature2',
        'services.fullstack.feature3',
        'services.fullstack.feature4'
      ],
      price: null
    },
    {
      icon: 'design' as const,
      title: 'services.design.title',
      description: 'services.design.description',
      features: [
        'services.design.feature1',
        'services.design.feature2',
        'services.design.feature3',
        'services.design.feature4'
      ],
      price: null
    }
  ];

  processSteps = [
    {
      title: 'services.process.step1.title',
      description: 'services.process.step1.description'
    },
    {
      title: 'services.process.step2.title',
      description: 'services.process.step2.description'
    },
    {
      title: 'services.process.step3.title',
      description: 'services.process.step3.description'
    },
    {
      title: 'services.process.step4.title',
      description: 'services.process.step4.description'
    }
  ];
}




