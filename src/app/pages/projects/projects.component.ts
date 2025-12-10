import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icons/icons.component';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  category: 'web' | 'gaming' | 'fullstack';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollAnimationDirective, TranslatePipe],
  template: `
    <div class="projects-page">
      <section class="projects-hero section">
        <div class="container">
          <div class="hero-content" appScrollAnimation>
            <h1>{{ 'projects.title' | translate }}</h1>
            <p class="subtitle">
              {{ 'projects.subtitle' | translate }}
            </p>
          </div>
        </div>
      </section>

      <section class="projects-section section">
        <div class="container">
          <div class="filter-buttons">
            <button 
              *ngFor="let category of categories" 
              (click)="filterProjects(category)"
              [class.active]="selectedCategory === category"
              class="filter-btn">
              {{ getCategoryLabel(category) }}
            </button>
          </div>

          <ng-container *ngIf="!isLoading; else projectsSkeleton">
          <div class="projects-grid">
            <div 
              *ngFor="let project of filteredProjects; let i = index"
              class="project-card"
              appScrollAnimation
              [style.animation-delay]="(i * 0.1) + 's'">
              <div class="project-image">
                <div class="project-overlay">
                  <div class="project-links">
                    <a *ngIf="project.link" [href]="project.link" target="_blank" class="project-link" title="Voir le projet">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <a *ngIf="project.github" [href]="project.github" target="_blank" class="project-link" title="Code source">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="project-placeholder">
                  <div class="placeholder-icon"><app-icon [name]="getCategoryIconName(project.category)" size="64"></app-icon></div>
                </div>
              </div>
              <div class="project-content">
                <h3>{{ getProjectTitle(project.id) }}</h3>
                <p>{{ getProjectDescription(project.id) }}</p>
                <div class="project-tech">
                  <span *ngFor="let tech of project.technologies" class="tech-tag">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="filteredProjects.length === 0" class="no-projects">
            <p>{{ 'projects.noResults' | translate }}</p>
          </div>
          </ng-container>

          <ng-template #projectsSkeleton>
            <div class="projects-grid">
              <div class="project-card skeleton-card" *ngFor="let _ of [1,2,3,4]">
                <div class="project-image skeleton"></div>
                <div class="project-content">
                  <div class="skeleton-line lg"></div>
                  <div class="skeleton-line md"></div>
                  <div class="skeleton-line sm"></div>
                  <div class="project-tech" style="margin-top: 1rem;">
                    <span class="tech-tag skeleton-line sm"></span>
                    <span class="tech-tag skeleton-line sm"></span>
                  </div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .projects-page {
      width: 100%;
    }

    .projects-hero {
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      padding: 120px 0 80px;
      text-align: center;
    }

    .projects-hero h1 {
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

    .projects-section {
      background: var(--bg-card);
      padding: 80px 0;
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 24px;
      background: transparent;
      border: 2px solid var(--border-color);
      color: var(--text-secondary);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      position: relative;
      overflow: hidden;
    }

    .filter-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .filter-btn:hover::before {
      width: 200px;
      height: 200px;
    }

    .filter-btn:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2);
    }

    .filter-btn.active {
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      border-color: transparent;
      color: var(--text-primary);
      transform: scale(1.05);
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .project-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
    }

    .project-card:hover::after {
      opacity: 1;
    }

    .project-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: var(--primary-color);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
    }

    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: var(--bg-darker);
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--gaming-purple), var(--gaming-cyan));
    }

    .placeholder-icon {
      opacity: 0.8;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
      opacity: 1;
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-link {
      width: 50px;
      height: 50px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-dark);
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .project-link::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.4s, height 0.4s;
    }

    .project-link:hover::before {
      width: 100px;
      height: 100px;
    }

    .project-link:hover {
      background: var(--gaming-purple);
      transform: scale(1.15) rotate(5deg);
      box-shadow: 0 5px 20px rgba(124, 58, 237, 0.4);
    }

    .project-content {
      padding: 1.5rem;
    }

    .project-content h3 {
      color: var(--primary-color);
      margin-bottom: 0.75rem;
      font-size: 1.5rem;
    }

    .project-content p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-tag {
      background: var(--code-bg);
      color: var(--primary-color);
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-family: 'JetBrains Mono', monospace;
      border: 1px solid var(--border-color);
    }

    .no-projects {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .projects-hero h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  isLoading = true;
  selectedCategory: 'all' | 'web' | 'gaming' | 'fullstack' = 'all';
  categories: ('all' | 'web' | 'gaming' | 'fullstack')[] = ['all', 'web', 'gaming', 'fullstack'];

  projects: Project[] = [
    {
      id: 1,
      title: 'Application E-Commerce',
      description: 'Plateforme e-commerce complète avec gestion de panier, paiement et administration. Interface moderne et responsive.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
      image: '',
      category: 'fullstack',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Tableau de bord interactif pour visualiser des données en temps réel avec graphiques et statistiques.',
      technologies: ['Angular', 'Chart.js', 'REST API', 'SCSS'],
      image: '',
      category: 'web',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Jeu Web Interactif',
      description: 'Jeu développé en JavaScript avec Canvas API, combinant gameplay addictif et design moderne.',
      technologies: ['JavaScript', 'Canvas API', 'HTML5', 'CSS3'],
      image: '',
      category: 'gaming',
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'API RESTful',
      description: 'API robuste pour application web avec authentification JWT, gestion des utilisateurs et documentation complète.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: '',
      category: 'fullstack',
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'Portfolio Créatif',
      description: 'Site portfolio avec animations fluides, transitions modernes et design épuré pour mettre en valeur les projets.',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'GSAP'],
      image: '',
      category: 'web',
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Simulateur de Jeu',
      description: 'Simulateur de gameplay avec mécaniques de jeu complexes, système de scores et classements.',
      technologies: ['TypeScript', 'Angular', 'WebGL', 'Three.js'],
      image: '',
      category: 'gaming',
      link: '#',
      github: '#'
    }
  ];

  ngOnInit() {
    // Simule un chargement initial pour afficher les skeletons
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  filterProjects(category: 'all' | 'web' | 'gaming' | 'fullstack') {
    this.selectedCategory = category;
  }

  getCategoryLabel(category: string): string {
    const key = `projects.filter.${category}`;
    return this.translateService.instant(key);
  }

  constructor(private translateService: TranslationService) {}

  getCategoryIconName(category: string): 'web' | 'gaming' | 'rocket' | 'code' {
    const icons: { [key: string]: 'web' | 'gaming' | 'rocket' | 'code' } = {
      'web': 'web',
      'gaming': 'gaming',
      'fullstack': 'rocket'
    };
    return icons[category] || 'code';
  }

  getProjectTitle(projectId: number): string {
    return this.translateService.instant(`projects.${projectId}.title`);
  }

  getProjectDescription(projectId: number): string {
    return this.translateService.instant(`projects.${projectId}.description`);
  }
}

