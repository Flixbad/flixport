import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="scroll-top" 
      *ngIf="isVisible" 
      (click)="scrollToTop()"
      aria-label="Retour en haut">
      <span class="scroll-top-icon">▲</span>
    </button>
  `,
  styles: [`
    .scroll-top {
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      border: 1px solid var(--border-color);
      background: rgba(15, 23, 42, 0.9);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .scroll-top:hover {
      transform: translateY(-3px);
      border-color: var(--primary-color);
      color: var(--primary-color);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
    }

    .scroll-top-icon {
      font-size: 1rem;
    }
  `]
})
export class ScrollTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    this.isVisible = yOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}