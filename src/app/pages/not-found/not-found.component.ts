import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icons/icons.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, TranslatePipe],
  template: `
    <div class="not-found-page">
      <div class="not-found-container">
        <div class="error-content">
          <!-- Code animé en arrière-plan -->
          <div class="code-background">
            <div class="code-line" *ngFor="let line of codeLines; let i = index" 
                 [style.animation-delay]="(i * 0.1) + 's'">
              <span class="line-number">{{ i + 1 }}</span>
              <span class="code-text">{{ line }}</span>
            </div>
          </div>

          <!-- Contenu principal -->
          <div class="error-main">
            <div class="error-number">
              <span class="number-4">4</span>
              <div class="icon-container">
                <app-icon name="code" size="120"></app-icon>
              </div>
              <span class="number-4">4</span>
            </div>

            <h1 class="error-title">{{ '404.title' | translate }}</h1>
            <p class="error-message">
              {{ '404.message' | translate }}
            </p>
            <p class="error-submessage">
              {{ '404.submessage' | translate }}
            </p>

            <div class="error-actions">
              <a routerLink="/" class="btn btn-primary">
                <app-icon name="code" size="20" class="btn-icon"></app-icon>
                {{ '404.backHome' | translate }}
              </a>
              <button (click)="goBack()" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                {{ '404.backPrevious' | translate }}
              </button>
            </div>

            <!-- Suggestions de navigation -->
            <div class="suggestions">
              <h3>{{ '404.suggestions' | translate }}</h3>
              <div class="suggestions-links">
                <a routerLink="/" class="suggestion-link">
                  <app-icon name="code" size="24"></app-icon>
                  <span>{{ 'nav.home' | translate }}</span>
                </a>
                <a routerLink="/projets" class="suggestion-link">
                  <app-icon name="rocket" size="24"></app-icon>
                  <span>{{ 'nav.projects' | translate }}</span>
                </a>
                <a routerLink="/contact" class="suggestion-link">
                  <app-icon name="email" size="24"></app-icon>
                  <span>{{ 'nav.contact' | translate }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .not-found-page::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    .not-found-container {
      max-width: 900px;
      width: 100%;
      position: relative;
      z-index: 1;
    }

    .error-content {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 3rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    /* Code en arrière-plan */
    .code-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.05;
      padding: 2rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      line-height: 1.6;
      overflow: hidden;
    }

    .code-line {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      animation: codeFade 3s ease-in-out infinite;
      opacity: 0;
    }

    @keyframes codeFade {
      0%, 100% {
        opacity: 0;
        transform: translateX(-20px);
      }
      50% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .line-number {
      color: var(--text-muted);
      min-width: 30px;
    }

    .code-text {
      color: var(--primary-color);
    }

    .error-main {
      position: relative;
      z-index: 2;
      text-align: center;
    }

    .error-number {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      font-size: 8rem;
      font-weight: 700;
      line-height: 1;
    }

    .number-4 {
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: float 3s ease-in-out infinite;
    }

    .number-4:nth-child(1) {
      animation-delay: 0s;
    }

    .number-4:nth-child(3) {
      animation-delay: 0.5s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .icon-container {
      color: var(--primary-color);
      animation: rotate 4s linear infinite;
      filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .error-title {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .error-message {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
      line-height: 1.8;
    }

    .error-submessage {
      font-size: 1rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      font-style: italic;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
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

    .btn-icon {
      display: inline-flex;
    }

    .suggestions {
      margin-top: 3rem;
      padding-top: 3rem;
      border-top: 1px solid var(--border-color);
    }

    .suggestions h3 {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .suggestions-links {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .suggestion-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      background: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      text-decoration: none;
      color: var(--text-secondary);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 120px;
    }

    .suggestion-link:hover {
      transform: translateY(-5px) scale(1.05);
      border-color: var(--primary-color);
      color: var(--primary-color);
      box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
    }

    .suggestion-link app-icon {
      color: var(--primary-color);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .suggestion-link:hover app-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .suggestion-link span {
      font-weight: 500;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .error-number {
        font-size: 5rem;
        gap: 0.5rem;
      }

      .icon-container app-icon {
        width: 80px;
        height: 80px;
      }

      .error-title {
        font-size: 2rem;
      }

      .error-message {
        font-size: 1rem;
      }

      .error-content {
        padding: 2rem 1.5rem;
      }

      .suggestions-links {
        flex-direction: column;
        align-items: stretch;
      }

      .suggestion-link {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class NotFoundComponent {
  codeLines = [
    'const page = findPage(url);',
    'if (!page) {',
    '  return <NotFound />;',
    '}',
    'throw new Error("404");',
    '// Page introuvable',
    'return null;'
  ];

  goBack() {
    window.history.back();
  }
}

