import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icons/icons.component';

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  icon: 'code' | 'gaming' | 'rocket' | 'web' | 'github';
  delay: number;
  visible: boolean;
}

@Component({
  selector: 'app-floating-icons',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="floating-icons-container">
      <!-- Étoiles animées -->
      <div class="stars">
        <span *ngFor="let star of stars; let i = index" 
              class="star" 
              [style.left.%]="star.x"
              [style.top.%]="star.y"
              [style.animation-delay]="star.delay + 's'"
              [style.opacity]="star.opacity">
          ★
        </span>
      </div>
      
      <!-- Particules de code -->
      <div class="code-particles">
        <span *ngFor="let particle of codeParticles" 
              class="code-particle"
              [style.left.%]="particle.x"
              [style.top.%]="particle.y"
              [style.animation-delay]="particle.delay + 's'">
          {{ particle.char }}
        </span>
      </div>
      
      <!-- Icônes flottantes -->
      <div class="floating-icons">
        <div *ngFor="let icon of icons" 
             class="floating-icon"
             [class.visible]="icon.visible"
             [style.left.%]="icon.x"
             [style.top.%]="icon.y"
             [style.animation-delay]="icon.delay + 's'"
             [style.--mouse-x]="getMouseOffsetX(icon) + 'px'"
             [style.--mouse-y]="getMouseOffsetY(icon) + 'px'">
          <app-icon [name]="icon.icon" size="32" [strokeWidth]="'1.5'"></app-icon>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .floating-icons-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .stars,
    .code-particles,
    .floating-icons {
      pointer-events: none;
    }

    /* Étoiles */
    .stars {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .star {
      position: absolute;
      color: var(--primary-color);
      font-size: 12px;
      animation: twinkle 3s ease-in-out infinite;
      opacity: 0.3;
    }

    @keyframes twinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.2);
      }
    }

    /* Icônes flottantes */
    .floating-icons {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .floating-icon {
      position: absolute;
      color: var(--primary-color);
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
      filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
    }

    .floating-icon.visible {
      opacity: 1;
      transform: translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px))) scale(1);
      animation: floatAdvanced 8s ease-in-out infinite;
      transition: transform 0.1s ease-out;
    }

    @keyframes floatAdvanced {
      0%, 100% {
        transform: translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px))) translateY(0px) rotate(0deg) scale(1);
      }
      25% {
        transform: translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px))) translateY(-25px) rotate(5deg) scale(1.05);
      }
      50% {
        transform: translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px))) translateY(-15px) rotate(-5deg) scale(1.1);
      }
      75% {
        transform: translate(calc(-50% + var(--mouse-x, 0px)), calc(-50% + var(--mouse-y, 0px))) translateY(-20px) rotate(3deg) scale(1.05);
      }
    }

    /* Animation différente pour chaque icône */
    .floating-icon:nth-child(1) {
      animation-delay: 0s;
    }

    .floating-icon:nth-child(2) {
      animation-delay: 0.5s;
    }

    .floating-icon:nth-child(3) {
      animation-delay: 1s;
    }

    .floating-icon:nth-child(4) {
      animation-delay: 1.5s;
    }

    .floating-icon:nth-child(5) {
      animation-delay: 2s;
    }

    .floating-icon:nth-child(6) {
      animation-delay: 2.5s;
    }

    .floating-icon:nth-child(7) {
      animation-delay: 3s;
    }

    .floating-icon:nth-child(8) {
      animation-delay: 3.5s;
    }

    /* Particules de code */
    .code-particles {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .code-particle {
      position: absolute;
      color: var(--gaming-purple);
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      opacity: 0;
      animation: codeFloat 8s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes codeFloat {
      0% {
        opacity: 0;
        transform: translateY(0) rotate(0deg);
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        opacity: 0;
        transform: translateY(-100px) rotate(360deg);
      }
    }

    /* Effet de glow au hover - désactivé car les icônes ont pointer-events: none */
    .floating-icon {
      will-change: transform;
    }

    @keyframes floatAdvanced {
      0%, 100% {
        transform: translate(-50%, -50%) translateY(0px) rotate(0deg) scale(1);
      }
      25% {
        transform: translate(-50%, -50%) translateY(-25px) rotate(5deg) scale(1.05);
      }
      50% {
        transform: translate(-50%, -50%) translateY(-15px) rotate(-5deg) scale(1.1);
      }
      75% {
        transform: translate(-50%, -50%) translateY(-20px) rotate(3deg) scale(1.05);
      }
    }
  `]
})
export class FloatingIconsComponent implements OnInit, OnDestroy {
  stars: Array<{ x: number; y: number; delay: number; opacity: number }> = [];
  icons: FloatingIcon[] = [];
  codeParticles: Array<{ x: number; y: number; delay: number; char: string }> = [];
  private mouseEntered = false;
  private mouseX = 0;
  private mouseY = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.generateStars();
    this.generateIcons();
    this.generateCodeParticles();
  }

  generateCodeParticles() {
    const chars = ['{', '}', '<', '>', '/', ';', '=', '(', ')', '[', ']'];
    for (let i = 0; i < 15; i++) {
      this.codeParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        char: chars[Math.floor(Math.random() * chars.length)]
      });
    }
  }

  ngOnDestroy() {
    // Cleanup si nécessaire
  }

  generateStars() {
    // Générer 30 étoiles aléatoirement positionnées
    for (let i = 0; i < 30; i++) {
      this.stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.4
      });
    }
  }

  generateIcons() {
    const iconTypes: Array<'code' | 'gaming' | 'rocket' | 'web' | 'github'> = [
      'code', 'gaming', 'code', 'rocket', 'web', 'gaming', 'github', 'code'
    ];

    // Générer 8 icônes avec positions aléatoires
    for (let i = 0; i < 8; i++) {
      this.icons.push({
        id: i,
        x: 10 + Math.random() * 80, // Éviter les bords
        y: 10 + Math.random() * 80,
        icon: iconTypes[i],
        delay: i * 0.3,
        visible: false
      });
    }
  }

  onMouseEnter() {
    this.mouseEntered = true;
    // Faire apparaître les icônes progressivement
    this.icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.visible = true;
      }, index * 100);
    });
  }

  onMouseLeave() {
    this.mouseEntered = false;
    // Faire disparaître les icônes
    this.icons.forEach(icon => {
      icon.visible = false;
    });
  }

  @HostListener('mouseenter', ['$event'])
  onHostMouseEnter(event: MouseEvent) {
    this.onMouseEnter();
  }

  @HostListener('mouseleave', ['$event'])
  onHostMouseLeave(event: MouseEvent) {
    this.onMouseLeave();
  }

  @HostListener('mousemove', ['$event'])
  onHostMouseMove(event: MouseEvent) {
    if (!this.mouseEntered) return;
    
    const container = this.elementRef.nativeElement.querySelector('.floating-icons-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    this.mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    this.mouseY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  getMouseOffsetX(icon: FloatingIcon): number {
    if (!this.mouseEntered || !icon.visible) {
      return 0;
    }
    
    const dx = this.mouseX - icon.x;
    const dy = this.mouseY - icon.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const maxDistance = 25;
    if (distance < maxDistance && distance > 0) {
      const force = 1 - (distance / maxDistance);
      return (dx / distance) * force * 15;
    }
    
    return 0;
  }

  getMouseOffsetY(icon: FloatingIcon): number {
    if (!this.mouseEntered || !icon.visible) {
      return 0;
    }
    
    const dx = this.mouseX - icon.x;
    const dy = this.mouseY - icon.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const maxDistance = 25;
    if (distance < maxDistance && distance > 0) {
      const force = 1 - (distance / maxDistance);
      return (dy / distance) * force * 15;
    }
    
    return 0;
  }
}

