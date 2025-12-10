import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icons/icons.component';
import { FloatingIconsComponent } from '../../components/floating-icons/floating-icons.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IconComponent, FloatingIconsComponent, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero section">
        <app-floating-icons></app-floating-icons>
        <div class="container">
          <ng-container *ngIf="!isHeroLoading; else heroSkeleton">
            <div class="hero-content fade-in">
              <div class="hero-text">
                <h1 class="hero-title">
                  {{ 'home.hero.title' | translate }} <span class="highlight">FlixDev</span>
                </h1>
                <p class="hero-subtitle">
                  {{ 'home.hero.subtitle' | translate }}
                </p>
                <div class="hero-buttons">
                  <a href="#parcours" class="btn btn-primary">{{ 'home.hero.btn.parcours' | translate }}</a>
                  <a href="/projets" class="btn btn-secondary">{{ 'home.hero.btn.projects' | translate }}</a>
                </div>
              </div>
              <div class="hero-image">
                <div class="code-window">
                  <div class="code-header">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                    <span class="code-title">portfolio.ts</span>
                  </div>
                  <div class="code-content">
                    <pre><code><span class="keyword">const</span> <span class="variable">developer</span> = {{ '{' }}
  <span class="property">name</span>: <span class="string">'FlixDev'</span>,
  <span class="property">passion</span>: <span class="string">'Développement Web'</span>,
  <span class="property">skills</span>: [<span class="string">'Angular'</span>, <span class="string">'TypeScript'</span>, <span class="string">'Node.js'</span>],
  <span class="property">hobby</span>: <span class="string">'Jeux Vidéo'</span>
{{ '};' }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>

          <ng-template #heroSkeleton>
            <div class="hero-content">
              <div class="hero-text">
                <div class="skeleton skeleton-line lg" style="height: 32px; margin-bottom: 16px;"></div>
                <div class="skeleton skeleton-line md" style="height: 18px; margin-bottom: 10px;"></div>
                <div class="skeleton skeleton-line md" style="height: 18px; margin-bottom: 20px;"></div>
                <div class="hero-buttons">
                  <div class="btn btn-primary skeleton" style="width: 160px; height: 44px;"></div>
                  <div class="btn btn-secondary skeleton" style="width: 160px; height: 44px;"></div>
                </div>
              </div>
              <div class="hero-image">
                <div class="code-window skeleton-card">
                  <div class="skeleton-line lg"></div>
                  <div class="skeleton-line md"></div>
                  <div class="skeleton-line sm"></div>
                  <div class="skeleton-line lg"></div>
                  <div class="skeleton-line md"></div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </section>

      <!-- Parcours Section -->
      <section id="parcours" class="parcours section">
        <div class="container">
          <h2 class="section-title" appScrollAnimation>{{ 'home.parcours.title' | translate }}</h2>
          <div class="parcours-content">
            <div class="parcours-text" appScrollAnimation>
              <p class="intro-text">
                {{ 'home.parcours.intro' | translate }}
              </p>
              <div class="timeline">
                <div class="timeline-item" appScrollAnimation>
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ 'home.parcours.timeline.start.title' | translate }}</h3>
                    <p>
                      {{ 'home.parcours.timeline.start.desc' | translate }}
                    </p>
                  </div>
                </div>
                <div class="timeline-item" appScrollAnimation>
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ 'home.parcours.timeline.formation.title' | translate }}</h3>
                    <p>
                      {{ 'home.parcours.timeline.formation.desc' | translate }}
                    </p>
                  </div>
                </div>
                <div class="timeline-item" appScrollAnimation>
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ 'home.parcours.timeline.today.title' | translate }}</h3>
                    <p>
                      {{ 'home.parcours.timeline.today.desc' | translate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="parcours-image" appScrollAnimation>
              <div class="gaming-card">
                <div class="card-glow"></div>
                <div class="card-content">
                  <h3><app-icon name="gaming" size="32" class="inline-icon"></app-icon> {{ 'home.parcours.gaming.title' | translate }}</h3>
                  <p>{{ 'home.parcours.gaming.desc' | translate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Passions Section -->
      <section class="passions section">
        <div class="container">
          <h2 class="section-title" appScrollAnimation>{{ 'home.passions.title' | translate }}</h2>
          <div class="passions-grid">
            <div class="passion-card" appScrollAnimation>
              <div class="passion-icon"><app-icon name="code" size="48"></app-icon></div>
              <h3>{{ 'home.passions.dev.title' | translate }}</h3>
              <p>
                {{ 'home.passions.dev.desc' | translate }}
              </p>
            </div>
            <div class="passion-card" appScrollAnimation>
              <div class="passion-icon"><app-icon name="gaming" size="48"></app-icon></div>
              <h3>{{ 'home.passions.gaming.title' | translate }}</h3>
              <p>
                {{ 'home.passions.gaming.desc' | translate }}
              </p>
            </div>
            <div class="passion-card" appScrollAnimation>
              <div class="passion-icon"><app-icon name="rocket" size="48"></app-icon></div>
              <h3>{{ 'home.passions.innovation.title' | translate }}</h3>
              <p>
                {{ 'home.passions.innovation.desc' | translate }}
              </p>
            </div>
            <div class="passion-card" appScrollAnimation>
              <div class="passion-icon"><app-icon name="design" size="48"></app-icon></div>
              <h3>{{ 'home.passions.design.title' | translate }}</h3>
              <p>
                {{ 'home.passions.design.desc' | translate }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pourquoi le développement web -->
      <section class="why-dev section">
        <div class="container">
          <div class="why-content">
            <div class="why-text" appScrollAnimation>
              <h2>{{ 'home.why.title' | translate }}</h2>
              <p>
                {{ 'home.why.p1' | translate }}
              </p>
              <p>
                {{ 'home.why.p2' | translate }}
              </p>
              <p>
                {{ 'home.why.p3' | translate }}
              </p>
            </div>
            <div class="why-visual" appScrollAnimation>
              <div class="tech-stack">
                <div class="tech-item" *ngFor="let tech of techStack; let i = index" 
                     [style.animation-delay]="(i * 0.1) + 's'">{{ tech }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      width: 100%;
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
      z-index: 0;
    }

    .hero app-floating-icons {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .highlight {
      color: var(--primary-color);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.8;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 30px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-block;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
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

    .btn:hover::before {
      width: 300px;
      height: 300px;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      color: var(--text-primary);
      border: none;
      position: relative;
      z-index: 1;
    }

    .btn-primary:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
    }

    .btn-secondary {
      background: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      position: relative;
      z-index: 1;
    }

    .btn-secondary:hover {
      background: var(--primary-color);
      color: var(--bg-dark);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
    }

    .code-window {
      background: var(--code-bg);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border-color);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      animation: codeWindowFloat 6s ease-in-out infinite;
    }

    @keyframes codeWindowFloat {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-10px) rotate(1deg);
      }
    }

    .code-window:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 25px 70px rgba(0, 212, 255, 0.3);
      border-color: var(--primary-color);
    }

    .code-header {
      background: var(--bg-card);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--border-color);
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }

    .code-title {
      margin-left: 12px;
      color: var(--text-secondary);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
    }

    .code-content {
      padding: 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.8;
    }

    .code-content .keyword { color: #c792ea; }
    .code-content .variable { color: #82aaff; }
    .code-content .property { color: #7fdbca; }
    .code-content .string { color: #c3e88d; }

    /* Parcours Section */
    .parcours {
      background: var(--bg-card);
    }

    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      font-size: 2.5rem;
    }

    .parcours-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .intro-text {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: 3rem;
      line-height: 1.8;
    }

    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--primary-color), var(--gaming-purple));
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .timeline-item:hover {
      transform: translateX(10px);
    }

    .timeline-item:hover .timeline-marker {
      transform: scale(1.3);
      box-shadow: 0 0 20px var(--primary-color);
    }

    .timeline-marker {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .timeline-marker {
      position: absolute;
      left: -2.5rem;
      top: 0.5rem;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color);
      border: 3px solid var(--bg-card);
      box-shadow: 0 0 0 3px var(--primary-color);
    }

    .timeline-content h3 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .timeline-content p {
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .gaming-card {
      background: linear-gradient(135deg, var(--gaming-purple), var(--gaming-pink));
      border-radius: 16px;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-glow {
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      animation: pulse 3s ease-in-out infinite;
    }

    .card-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .card-content h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
    
    .card-content h3 app-icon {
      color: white;
    }

    .card-content p {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    /* Passions Section */
    .passions {
      background: var(--bg-dark);
    }

    .passions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .passion-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .passion-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.5s;
    }

    .passion-card:hover::before {
      left: 100%;
    }

    .passion-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: var(--primary-color);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
    }

    .passion-icon {
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .passion-card:hover .passion-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .passion-icon {
      margin-bottom: 1rem;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .inline-icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    .passion-card h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .passion-card p {
      color: var(--text-secondary);
      line-height: 1.8;
    }

    /* Why Dev Section */
    .why-dev {
      background: var(--bg-darker);
    }

    .why-content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .why-text h2 {
      margin-bottom: 2rem;
      color: var(--primary-color);
    }

    .why-text p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .tech-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      padding: 12px 24px;
      border-radius: 8px;
      color: var(--primary-color);
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .tech-item:hover {
      background: var(--primary-color);
      color: var(--bg-dark);
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
    }

    @media (max-width: 968px) {
      .hero-content,
      .parcours-content,
      .why-content {
        grid-template-columns: 1fr;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .code-window {
        margin-top: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  isHeroLoading = true;
  techStack = ['Angular', 'TypeScript', 'Node.js', 'SCSS', 'Git', 'REST API'];

  ngOnInit() {
    // Simule un petit chargement pour le skeleton du hero
    setTimeout(() => {
      this.isHeroLoading = false;
    }, 600);
  }
}

