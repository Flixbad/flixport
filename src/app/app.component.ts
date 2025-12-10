import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTopComponent],
  template: `
    <a class="skip-link" href="#main-content">Aller au contenu principal</a>
    <app-header></app-header>
    <main id="main-content" role="main">
      <router-outlet></router-outlet>
    </main>
    <app-scroll-top></app-scroll-top>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent {
  title = 'FlixDev';
}

