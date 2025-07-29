import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Subscription } from 'rxjs';

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
  private animationsStarted = false;
  private loadingSubscription?: Subscription;
  private videoElement?: HTMLVideoElement;

  constructor(
    public analyticsService: AnalyticsService,
    private elementRef: ElementRef,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    // Suscribirse a cuando las animaciones deben comenzar
    this.loadingSubscription = this.loadingService.animationsStarted$.subscribe((shouldStart) => {
      if (shouldStart && !this.animationsStarted) {
        this.animationsStarted = true;
        this.initAnimations();
        this.showVideo();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initVideoPlayback();
    // Check if animations should already be started
    if (this.loadingService.animationsStarted && !this.animationsStarted) {
      this.animationsStarted = true;
      this.initAnimations();
      this.showVideo();
    }
  }

  ngOnDestroy(): void {
    this.clearAllTimeouts();
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
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

  private showVideo(): void {
    if (this.videoElement) {
      // Mostrar video y comenzar reproducción cuando se inician las animaciones
      this.videoElement.classList.add('loaded');
      this.startVideoPlayback();
    }
    
    // Mostrar overlay con la misma animación que el video
    const overlay = this.elementRef.nativeElement.querySelector('.banner-overlay') as HTMLElement;
    if (overlay) {
      overlay.classList.add('loaded');
    }
  }

  private startVideoPlayback(): void {
    if (!this.videoElement) return;

    // Asegurar que el video esté silenciado
    this.videoElement.muted = true;
    this.videoElement.volume = 0;

    // Cargar el video completo ahora que el splash screen se ha ocultado
    this.videoElement.preload = 'auto';
    this.videoElement.load();

    // Agregar listener para errores de carga específicos para GitHub Pages
    this.videoElement.addEventListener('error', (e) => {
      console.warn('Error loading video:', e);
      // Fallback: reintentar con un delay
      setTimeout(() => {
        if (this.videoElement && this.videoElement.error) {
          this.videoElement.load();
        }
      }, 1000);
    });

    // Intentar reproducir el video cuando esté listo
    const playWhenReady = () => {
      if (this.videoElement!.readyState >= 3) { // HAVE_FUTURE_DATA
        this.videoElement!.play().catch(error => {
          console.warn('Error al reproducir video:', error);
          this.setupUserInteractionPlayback(this.videoElement!);
        });
      } else {
        this.videoElement!.addEventListener('canplay', () => {
          this.videoElement!.play().catch(error => {
            console.warn('Error al reproducir video:', error);
            this.setupUserInteractionPlayback(this.videoElement!);
          });
        }, { once: true });
      }
    };

    playWhenReady();
  }

  // Método para configurar el video sin reproducir automáticamente
  private initVideoPlayback(): void {
    const video = this.elementRef.nativeElement.querySelector('.banner-video') as HTMLVideoElement;

    if (!video) return;

    this.videoElement = video;

    // Asegurar que el video esté completamente silenciado
    video.muted = true;
    video.volume = 0;

    // Configurar el video para carga lazy hasta que termine el splash screen
    video.preload = 'none';
    
    console.log('Video configurado para carga diferida');
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
