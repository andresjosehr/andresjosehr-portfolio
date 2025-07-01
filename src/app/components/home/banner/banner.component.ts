import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Las partículas ahora son globales
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    // Ya no necesitamos limpiar partículas locales
  }

  private initAnimations(): void {
    const banner = this.elementRef.nativeElement;

    // Animaciones más rápidas - reducidos los timeouts
    setTimeout(() => {
      // Título principal
      const pretitle = banner.querySelector('.banner-pretitle h1');
      if (pretitle) {
        pretitle.style.opacity = '1';
        pretitle.style.transform = 'translateY(0)';
      }
    }, 100); // Reducido de 200 a 100

    setTimeout(() => {
      // Nombre con efecto typewriter mejorado
      const name = banner.querySelector('.banner-name');
      if (name) {
        const originalText = name.textContent || '';
        name.innerHTML = `<span class="typed-text"></span><span class="cursor">|</span>`;

        const typedTextElement = name.querySelector('.typed-text') as HTMLElement;
        const cursorElement = name.querySelector('.cursor') as HTMLElement;

        name.style.opacity = '1';

        // Parpadeo eterno del cursor
        let cursorVisible = true;
        setInterval(() => {
          cursorElement.style.opacity = cursorVisible ? '0' : '1';
          cursorVisible = !cursorVisible;
        }, 500);

        let i = 0;
        const typeInterval = setInterval(() => {
          typedTextElement.textContent = originalText.substring(0, i + 1);
          i++;

          if (i >= originalText.length) {
            clearInterval(typeInterval);
            // El cursor sigue parpadeando eternamente
          }
        }, 80);
      }
    }, 800);

    setTimeout(() => {
      // Subtítulo con efecto glitch
      const subtitle = banner.querySelector('.banner-subtitle');
      if (subtitle) {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translate(0) scale(1)';
        subtitle.setAttribute('data-text', subtitle.textContent || '');

        // Efectos glitch temporales
        setTimeout(() => {
          if (subtitle.querySelector('::before')) {
            (subtitle as HTMLElement).style.setProperty('--before-opacity', '0.8');
          }
          if (subtitle.querySelector('::after')) {
            (subtitle as HTMLElement).style.setProperty('--after-opacity', '0.8');
          }
        }, 100);
      }
    }, 1800); // Reducido de 3000 a 1800

    setTimeout(() => {
      // Descripción con efecto morph
      const description = banner.querySelector('.banner-description');
      if (description) {
        description.style.opacity = '1';
        description.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      }
    }, 2400); // Reducido de 4200 a 2400

    setTimeout(() => {
      // Botón con efecto scale
      const button = banner.querySelector('.main-btn');
      if (button) {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
      }
    }, 3000); // Reducido de 5400 a 3000
  }
}
