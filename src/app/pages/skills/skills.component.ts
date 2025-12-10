import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icons/icons.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  percentage: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="skills-page">
      <section class="skills-hero section">
        <div class="container">
          <div class="hero-content" appScrollAnimation>
            <h1>{{ 'skills.title' | translate }}</h1>
            <p class="subtitle">
              {{ 'skills.subtitle' | translate }}
            </p>
          </div>
        </div>
      </section>

      <section class="skills-section section">
        <div class="container">
          <div class="skills-categories">
            <!-- Frontend -->
            <div class="category-section" appScrollAnimation>
              <div class="category-header">
                <app-icon name="code" size="32"></app-icon>
                <h2>{{ 'skills.categories.frontend' | translate }}</h2>
              </div>
              <div class="skills-list">
                <div class="skill-item" *ngFor="let skill of getSkillsByCategory('frontend')">
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level" [class]="'level-' + skill.level">
                      {{ getLevelLabel(skill.level) | translate }}
                    </span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" 
                         [style.width.%]="skill.percentage"
                         [style.animation-delay]="(getSkillIndex(skill) * 0.1) + 's'"
                         [class]="'level-' + skill.level"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.percentage }}%</span>
                </div>
              </div>
            </div>

            <!-- Backend -->
            <div class="category-section" appScrollAnimation>
              <div class="category-header">
                <app-icon name="rocket" size="32"></app-icon>
                <h2>{{ 'skills.categories.backend' | translate }}</h2>
              </div>
              <div class="skills-list">
                <div class="skill-item" *ngFor="let skill of getSkillsByCategory('backend')">
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level" [class]="'level-' + skill.level">
                      {{ getLevelLabel(skill.level) | translate }}
                    </span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" 
                         [style.width.%]="skill.percentage"
                         [style.animation-delay]="(getSkillIndex(skill) * 0.1) + 's'"
                         [class]="'level-' + skill.level"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.percentage }}%</span>
                </div>
              </div>
            </div>

            <!-- Outils -->
            <div class="category-section" appScrollAnimation>
              <div class="category-header">
                <app-icon name="web" size="32"></app-icon>
                <h2>{{ 'skills.categories.tools' | translate }}</h2>
              </div>
              <div class="skills-list">
                <div class="skill-item" *ngFor="let skill of getSkillsByCategory('tools')">
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level" [class]="'level-' + skill.level">
                      {{ getLevelLabel(skill.level) | translate }}
                    </span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" 
                         [style.width.%]="skill.percentage"
                         [style.animation-delay]="(getSkillIndex(skill) * 0.1) + 's'"
                         [class]="'level-' + skill.level"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Graphiques radiaux -->
      <section class="radial-section section">
        <div class="container">
          <h2 class="section-title" appScrollAnimation>{{ 'skills.radial.title' | translate }}</h2>
          <div class="radial-grid">
            <div class="radial-card" *ngFor="let skill of topSkills; let i = index" appScrollAnimation [style.animation-delay]="(i * 0.1) + 's'">
              <div class="radial-chart">
                <svg class="radial-svg" viewBox="0 0 120 120">
                  <circle class="radial-bg" cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" stroke-width="8"/>
                  <circle 
                    class="radial-progress" 
                    [class]="'level-' + skill.level"
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="8"
                    stroke-linecap="round"
                    transform="rotate(-90 60 60)"
                    [attr.stroke-dasharray]="getRadialDashArray(skill.percentage)"/>
                  <text class="radial-percentage" x="60" y="65" text-anchor="middle" dominant-baseline="middle">
                    {{ skill.percentage }}%
                  </text>
                </svg>
              </div>
              <h3>{{ skill.name }}</h3>
              <span class="radial-level" [class]="'level-' + skill.level">
                {{ getLevelLabel(skill.level) | translate }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .skills-page {
      width: 100%;
    }

    .skills-hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0 80px;
      text-align: center;
    }

    .skills-hero h1 {
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

    .skills-section {
      background: var(--bg-card);
      padding: 80px 0;
    }

    .skills-categories {
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .category-section {
      background: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 2.5rem;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid var(--border-color);
    }

    .category-header app-icon {
      color: var(--primary-color);
    }

    .category-header h2 {
      color: var(--primary-color);
      font-size: 2rem;
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .skill-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 1rem;
      align-items: center;
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .skill-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 1.05rem;
    }

    .skill-level {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .level-beginner {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .level-intermediate {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }

    .level-advanced {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .progress-bar {
      grid-column: 1 / -1;
      height: 10px;
      background: var(--bg-darker);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      border-radius: 10px;
      position: relative;
      animation: progressFill 1.5s ease-out forwards;
      opacity: 0;
    }

    .progress-fill.level-beginner {
      background: linear-gradient(90deg, #ef4444, #f87171);
    }

    .progress-fill.level-intermediate {
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
    }

    .progress-fill.level-advanced {
      background: linear-gradient(90deg, #10b981, #34d399);
    }

    @keyframes progressFill {
      from {
        width: 0;
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .skill-percentage {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      min-width: 45px;
      text-align: right;
    }

    .radial-section {
      background: var(--bg-dark);
      padding: 80px 0;
    }

    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      font-size: 2.5rem;
    }

    .radial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .radial-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .radial-card:hover {
      transform: translateY(-8px) scale(1.05);
      border-color: var(--primary-color);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
    }

    .radial-chart {
      width: 120px;
      height: 120px;
      margin: 0 auto 1.5rem;
    }

    .radial-svg {
      width: 100%;
      height: 100%;
    }

    .radial-progress {
      filter: drop-shadow(0 0 8px currentColor);
      transition: stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .radial-progress.level-beginner {
      color: #ef4444;
    }

    .radial-progress.level-intermediate {
      color: #f59e0b;
    }

    .radial-progress.level-advanced {
      color: #10b981;
    }

    .radial-percentage {
      font-size: 20px;
      font-weight: 700;
      fill: var(--text-primary);
      font-family: 'JetBrains Mono', monospace;
    }

    .radial-card h3 {
      color: var(--text-primary);
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .radial-level {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    @media (max-width: 768px) {
      .skills-hero h1 {
        font-size: 2.5rem;
      }

      .category-section {
        padding: 1.5rem;
      }

      .radial-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }
  `]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [
    // Frontend
    { name: 'Angular', level: 'advanced', percentage: 90, category: 'frontend' },
    { name: 'TypeScript', level: 'advanced', percentage: 85, category: 'frontend' },
    { name: 'JavaScript', level: 'advanced', percentage: 88, category: 'frontend' },
    { name: 'HTML5', level: 'advanced', percentage: 95, category: 'frontend' },
    { name: 'CSS3/SCSS', level: 'advanced', percentage: 92, category: 'frontend' },
    { name: 'React', level: 'intermediate', percentage: 70, category: 'frontend' },
    { name: 'Vue.js', level: 'intermediate', percentage: 65, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', level: 'advanced', percentage: 85, category: 'backend' },
    { name: 'Express', level: 'advanced', percentage: 80, category: 'backend' },
    { name: 'MongoDB', level: 'intermediate', percentage: 75, category: 'backend' },
    { name: 'PostgreSQL', level: 'intermediate', percentage: 70, category: 'backend' },
    { name: 'REST API', level: 'advanced', percentage: 88, category: 'backend' },
    { name: 'GraphQL', level: 'intermediate', percentage: 65, category: 'backend' },
    
    // Outils
    { name: 'Git', level: 'advanced', percentage: 90, category: 'tools' },
    { name: 'Docker', level: 'intermediate', percentage: 70, category: 'tools' },
    { name: 'Webpack', level: 'intermediate', percentage: 75, category: 'tools' },
    { name: 'Jest', level: 'intermediate', percentage: 72, category: 'tools' },
    { name: 'Figma', level: 'intermediate', percentage: 68, category: 'tools' },
    { name: 'VS Code', level: 'advanced', percentage: 95, category: 'tools' }
  ];

  get topSkills(): Skill[] {
    return this.skills
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);
  }

  ngOnInit() {
    // Animation des barres de progression au scroll
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach(bar => {
        const element = bar as HTMLElement;
        element.style.width = element.style.width || '0%';
      });
    }, 100);
  }

  getSkillsByCategory(category: 'frontend' | 'backend' | 'tools'): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getSkillIndex(skill: Skill): number {
    return this.skills.indexOf(skill);
  }

  getLevelLabel(level: 'beginner' | 'intermediate' | 'advanced'): string {
    return `skills.level.${level}`;
  }

  getRadialDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 50; // r = 50, circumference ≈ 314.159
    const progress = (percentage / 100) * circumference;
    return `${progress} ${circumference}`;
  }
}

