import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: false
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;
  @Output() animationCompleted = new EventEmitter<void>();

  isHidden = false;
  loadingText = 'Loading...';
  
  private lottieAnimation: any;
  private minimumLoadingTime = 1800;
  private startTime = Date.now();
  private splashTimeout?: number;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.setupTranslations();
    this.initLottieAnimation();
    this.startSplashTimer();
  }

  ngOnDestroy(): void {
    if (this.lottieAnimation) {
      this.lottieAnimation.destroy();
    }
    if (this.splashTimeout) {
      clearTimeout(this.splashTimeout);
    }
  }

  private setupTranslations(): void {
    this.translate.get('Loading').subscribe((text: string) => {
      this.loadingText = text || 'Loading...';
    });
  }

  private initLottieAnimation(): void {
    try {
      this.lottieAnimation = lottie.loadAnimation({
        container: this.lottieContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lotties/loader.json'
      });

      this.lottieAnimation.addEventListener('error', (error: any) => {
        console.warn('Lottie animation error:', error);
      });
    } catch (error) {
      console.warn('Error initializing Lottie animation:', error);
    }
  }

  private startSplashTimer(): void {
    // Esperar tiempo mínimo y luego verificar si podemos ocultar el splash
    this.splashTimeout = window.setTimeout(() => {
      this.checkIfReadyToHide();
    }, this.minimumLoadingTime);
  }

  private checkIfReadyToHide(): void {
    // Verificar si el DOM está completamente cargado
    if (document.readyState === 'complete') {
      this.hideSplashScreen();
    } else {
      // Si no está completo, esperar un poco más
      window.addEventListener('load', () => {
        this.hideSplashScreen();
      }, { once: true });
      
      // Fallback después de 2 segundos adicionales
      setTimeout(() => {
        this.hideSplashScreen();
      }, 2000);
    }
  }

  private hideSplashScreen(): void {
    if (this.isHidden) return; // Evitar múltiples llamadas
    
    this.isHidden = true;
    
    // Emitir evento después de que la animación de salida termine
    setTimeout(() => {
      this.animationCompleted.emit();
    }, 800); // Coincide con la duración de la transición CSS
  }
}