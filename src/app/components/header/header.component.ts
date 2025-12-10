import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent, ThemeToggleComponent, TranslatePipe],
  template: `
    <header class="header" role="banner">
      <nav class="nav container" role="navigation" aria-label="Navigation principale">
        <div class="logo">
          <a routerLink="/" class="logo-link">
            <span class="logo-text">&lt;FlixDev /&gt;</span>
          </a>
        </div>
        <ul class="nav-menu" id="main-navigation">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ 'nav.home' | translate }}</a></li>
          <li><a routerLink="/projets" routerLinkActive="active">{{ 'nav.projects' | translate }}</a></li>
          <li><a routerLink="/competences" routerLinkActive="active">{{ 'nav.skills' | translate }}</a></li>
          <li><a routerLink="/services" routerLinkActive="active">{{ 'nav.services' | translate }}</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">{{ 'nav.contact' | translate }}</a></li>
        </ul>
        <div class="header-actions">
          <app-theme-toggle></app-theme-toggle>
          <app-language-selector></app-language-selector>
        </div>
        <button 
          class="mobile-menu-toggle" 
          (click)="toggleMenu()" 
          [attr.aria-label]="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          [attr.aria-expanded]="menuOpen"
          aria-controls="main-navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(10, 14, 39, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 1rem 0;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-link {
      text-decoration: none;
      color: var(--text-primary);
    }

    .logo-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      font-weight: 600;
      background: linear-gradient(135deg, var(--primary-color), var(--gaming-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      gap: 2rem;
      align-items: center;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-menu a {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .nav-menu a::before {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--primary-color);
      border-radius: 2px;
      transform: translateX(-50%);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      color: var(--primary-color);
      transform: translateY(-2px);
    }

    .nav-menu a:hover::before,
    .nav-menu a.active::before {
      width: 100%;
    }

    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }

    .mobile-menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--primary-color);
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: flex;
      }

      .header-actions {
        order: -1;
      }

      .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        flex-direction: column;
        background: var(--bg-card);
        width: 100%;
        padding: 2rem;
        gap: 1.5rem;
        transition: left 0.3s ease;
        border-top: 1px solid var(--border-color);
      }

      .nav-menu.active {
        left: 0;
      }
    }
  `]
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.nav-menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }
}

