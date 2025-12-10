import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle"
      (click)="toggleTheme()"
      [attr.aria-label]="(isDark ? 'Activer le mode clair' : 'Activer le mode sombre')"
      [title]="(isDark ? 'Mode sombre' : 'Mode clair')">
      <svg *ngIf="isDark" class="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg *ngIf="!isDark" class="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-toggle::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.4s, height 0.4s;
    }

    .theme-toggle:hover::before {
      width: 100px;
      height: 100px;
    }

    .theme-toggle:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: rotate(180deg) scale(1.1);
      box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2);
    }

    .theme-icon {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 1;
    }

    .theme-toggle:hover .theme-icon {
      transform: scale(1.1);
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDark = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getCurrentTheme().subscribe(theme => {
      this.isDark = theme === 'dark';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}




