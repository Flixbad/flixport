import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector" #dropdownContainer>
      <button 
        class="lang-btn-dropdown"
        (click)="toggleDropdown($event)"
        [attr.aria-label]="'Sélecteur de langue'"
        [attr.aria-expanded]="isOpen">
        <span class="lang-flag">{{ getCurrentFlag() }}</span>
        <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
        <svg class="dropdown-arrow" [class.open]="isOpen" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 4.5L6 7.5L9 4.5"/>
        </svg>
      </button>
      <div class="dropdown-menu" [class.open]="isOpen">
        <button 
          class="dropdown-item"
          [class.active]="currentLang === 'fr'"
          (click)="setLanguage('fr')">
          <span class="lang-flag">🇫🇷</span>
          <span class="lang-name">Français</span>
          <span class="lang-code">FR</span>
        </button>
        <button 
          class="dropdown-item"
          [class.active]="currentLang === 'en'"
          (click)="setLanguage('en')">
          <span class="lang-flag">🇬🇧</span>
          <span class="lang-name">English</span>
          <span class="lang-code">EN</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .language-selector {
      position: relative;
    }

    .lang-btn-dropdown {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 8px 12px;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 500;
      min-width: 80px;
    }

    .lang-btn-dropdown:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: var(--bg-card);
    }

    .dropdown-arrow {
      margin-left: auto;
      transition: transform 0.3s ease;
    }

    .dropdown-arrow.open {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      min-width: 160px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .dropdown-menu.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: inherit;
      font-size: 0.9rem;
      text-align: left;
    }

    .dropdown-item:first-child {
      border-radius: 8px 8px 0 0;
    }

    .dropdown-item:last-child {
      border-radius: 0 0 8px 8px;
    }

    .dropdown-item:hover {
      background: var(--bg-dark);
      color: var(--primary-color);
    }

    .dropdown-item.active {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1));
      color: var(--primary-color);
    }

    .dropdown-item .lang-flag {
      font-size: 1.2rem;
      line-height: 1;
    }

    .dropdown-item .lang-name {
      flex: 1;
      font-weight: 500;
    }

    .dropdown-item .lang-code {
      font-size: 0.85rem;
      opacity: 0.7;
      font-weight: 600;
    }

    .lang-flag {
      font-size: 1.2rem;
      line-height: 1;
    }

    .lang-code {
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .lang-btn-dropdown {
        padding: 6px 10px;
        font-size: 0.85rem;
        min-width: 70px;
      }

      .lang-code {
        display: none;
      }

      .dropdown-menu {
        right: 0;
      }
    }
  `]
})
export class LanguageSelectorComponent implements OnInit {
  currentLang = 'fr';
  isOpen = false;

  constructor(
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  setLanguage(lang: 'fr' | 'en') {
    this.translationService.setLanguage(lang);
    this.isOpen = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  getCurrentFlag(): string {
    return this.currentLang === 'fr' ? '🇫🇷' : '🇬🇧';
  }
}

