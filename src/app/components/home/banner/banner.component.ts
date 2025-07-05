import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

// Configuración centralizada de animaciones
interface AnimationConfig {
  delay: number;
  duration?: number;
  element: string;
  action: () => void;
}

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    standalone: false
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {

  // Configuración fácil de modificar
  private readonly animationTimings = {
    pretitle: 100,
    name: 800,
    subtitle: 1800,
    description: 2400,
    button: 3000
  };

  private readonly typewriterConfig = {
    speed: 80,
    cursorBlinkRate: 500
  };

  private animationTimeouts: number[] = [];

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Configuración inicial si es necesaria
  }

  ngAfterViewInit(): void {
    this.initAnimations();
    this.initVideoPlayback();
  }

  ngOnDestroy(): void {
    this.clearAllTimeouts();
  }

  private initAnimations(): void {
    const banner = this.elementRef.nativeElement;

    // Configuración de animaciones secuenciales
    const animations: AnimationConfig[] = [
      {
        delay: this.animationTimings.pretitle,
        element: '.banner-pretitle h1',
        action: () => this.animatePretitle(banner)
      },
      {
        delay: this.animationTimings.name,
        element: '.banner-name',
        action: () => this.animateTypewriter(banner)
      },
      {
        delay: this.animationTimings.subtitle,
        element: '.banner-subtitle',
        action: () => this.animateGlitch(banner)
      },
      {
        delay: this.animationTimings.description,
        element: '.banner-description',
        action: () => this.animateMorph(banner)
      },
      {
        delay: this.animationTimings.button,
        element: '.main-btn',
        action: () => this.animateButton(banner)
      }
    ];

    this.executeAnimations(animations);
  }

  private executeAnimations(animations: AnimationConfig[]): void {
    animations.forEach(animation => {
      const timeoutId = window.setTimeout(() => {
        animation.action();
      }, animation.delay);

      this.animationTimeouts.push(timeoutId);
    });
  }

  private animatePretitle(banner: HTMLElement): void {
    const pretitle = banner.querySelector('.banner-pretitle h1') as HTMLElement;
    if (!pretitle) return;

    pretitle.style.opacity = '1';
    pretitle.style.transform = 'translateY(0)';
  }

  private animateTypewriter(banner: HTMLElement): void {
    const nameElement = banner.querySelector('.banner-name') as HTMLElement;
    if (!nameElement) return;

    const originalText = nameElement.textContent || '';
    nameElement.innerHTML = `<span class="typed-text"></span><span class="cursor">|</span>`;

    const typedTextElement = nameElement.querySelector('.typed-text') as HTMLElement;
    const cursorElement = nameElement.querySelector('.cursor') as HTMLElement;

    nameElement.style.opacity = '1';

    this.startCursorBlink(cursorElement);
    this.startTypeEffect(typedTextElement, originalText);
  }

  private startCursorBlink(cursorElement: HTMLElement): void {
    let cursorVisible = true;
    setInterval(() => {
      cursorElement.style.opacity = cursorVisible ? '0' : '1';
      cursorVisible = !cursorVisible;
    }, this.typewriterConfig.cursorBlinkRate);
  }

  private startTypeEffect(textElement: HTMLElement, text: string): void {
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      textElement.textContent = text.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex >= text.length) {
        clearInterval(typeInterval);
      }
    }, this.typewriterConfig.speed);
  }

  private animateGlitch(banner: HTMLElement): void {
    const subtitle = banner.querySelector('.banner-subtitle') as HTMLElement;
    if (!subtitle) return;

    subtitle.style.opacity = '1';
    subtitle.style.transform = 'translate(0) scale(1)';
    subtitle.setAttribute('data-text', subtitle.textContent || '');

    this.applyGlitchEffects(subtitle);
  }

  private applyGlitchEffects(element: HTMLElement): void {
    setTimeout(() => {
      element.style.setProperty('--before-opacity', '0.8');
      element.style.setProperty('--after-opacity', '0.8');
    }, 100);
  }

  private animateMorph(banner: HTMLElement): void {
    const description = banner.querySelector('.banner-description') as HTMLElement;
    if (!description) return;

    // Forzar el estado inicial limpio
    description.style.setProperty('opacity', '0', 'important');
    description.style.setProperty('transform', 'translateY(20px)', 'important');
    description.style.setProperty('filter', 'blur(3px)', 'important');
    description.style.setProperty('transition', 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 'important');

    // Trigger reveal elegante
    requestAnimationFrame(() => {
      description.style.setProperty('opacity', '1', 'important');
      description.style.setProperty('transform', 'translateY(0)', 'important');
      description.style.setProperty('filter', 'blur(0px)', 'important');
    });
  }

  private animateButton(banner: HTMLElement): void {
    const button = banner.querySelector('.main-btn') as HTMLElement;
    if (!button) return;

    button.style.opacity = '1';
    button.style.transform = 'scale(1)';
  }

  private clearAllTimeouts(): void {
    this.animationTimeouts.forEach(id => clearTimeout(id));
    this.animationTimeouts = [];
  }

  // Métodos públicos para facilitar la configuración externa
  public updateAnimationTiming(element: keyof typeof this.animationTimings, delay: number): void {
    (this.animationTimings as any)[element] = delay;
  }

  public updateTypewriterSpeed(speed: number): void {
    this.typewriterConfig.speed = speed;
  }

  public updateCursorBlinkRate(rate: number): void {
    this.typewriterConfig.cursorBlinkRate = rate;
  }

  // Método para manejar la reproducción del video de forma robusta
  private initVideoPlayback(): void {
    const video = this.elementRef.nativeElement.querySelector('.banner-video') as HTMLVideoElement;

    if (!video) return;

    // Asegurar que el video esté completamente silenciado
    video.muted = true;
    video.volume = 0;

    // Configurar eventos del video
    video.addEventListener('loadeddata', () => {
      this.attemptVideoPlay(video);
    });

    video.addEventListener('canplaythrough', () => {
      this.attemptVideoPlay(video);
    });

    // Si el video ya está cargado, intentar reproducir
    if (video.readyState >= 2) {
      this.attemptVideoPlay(video);
    }
  }

  private attemptVideoPlay(video: HTMLVideoElement): void {
    // Solo intentar reproducir si el video no se está reproduciendo ya
    if (video.paused && !video.ended) {
      // Asegurar que esté silenciado antes de intentar reproducir
      video.muted = true;
      video.volume = 0;

      video.play().catch(error => {
        // Manejar el error silenciosamente - es normal que los navegadores bloqueen autoplay
        if (error.name === 'NotAllowedError') {
          console.log('Autoplay bloqueado por el navegador. El video se reproducirá después de la primera interacción del usuario.');
          this.setupUserInteractionPlayback(video);
        } else {
          console.warn('Error al reproducir video:', error);
        }
      });
    }
  }

  private setupUserInteractionPlayback(video: HTMLVideoElement): void {
    const playOnInteraction = () => {
      if (video.paused) {
        video.muted = true;
        video.volume = 0;
        video.play().catch(error => {
          console.warn('Error al reproducir video después de interacción:', error);
        });
      }
    };

    // Agregar listeners para diferentes tipos de interacción
    const events = ['click', 'touchstart', 'keydown', 'scroll'];

    events.forEach(eventType => {
      document.addEventListener(eventType, playOnInteraction, {
        once: true,
        passive: true
      });
    });
  }
}
