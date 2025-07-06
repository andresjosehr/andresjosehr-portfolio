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
  private assetsLoaded = false;
  private videoLoaded = false;
  private minimumLoadingTime = 2000; // 2 seconds minimum
  private startTime = Date.now();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.setupTranslations();
    this.initLottieAnimation();
    this.checkAssetsLoading();
  }

  ngOnDestroy(): void {
    if (this.lottieAnimation) {
      this.lottieAnimation.destroy();
    }
  }

  private setupTranslations(): void {
    this.translate.get('Loading').subscribe((text: string) => {
      this.loadingText = text || 'Loading...';
    });
  }

  private initLottieAnimation(): void {
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
  }

  private checkAssetsLoading(): void {
    // Check if all images are loaded
    this.checkImagesLoaded();
    
    // Check if video is loaded
    this.checkVideoLoaded();
    
    // Check fonts
    this.checkFontsLoaded();
  }

  private checkImagesLoaded(): void {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      console.log('No images to load');
      this.assetsLoaded = true;
      this.checkAllAssetsLoaded();
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            this.assetsLoaded = true;
            this.checkAllAssetsLoaded();
          }
        });
        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            this.assetsLoaded = true;
            this.checkAllAssetsLoaded();
          }
        });
      }
    });

    if (loadedImages === totalImages) {
      console.log('All images loaded');
      this.assetsLoaded = true;
      this.checkAllAssetsLoaded();
    }
  }

  private checkVideoLoaded(): void {
    // Esperar a que el video esté disponible en el DOM
    const waitForVideo = () => {
      const video = document.querySelector('.banner-video') as HTMLVideoElement;
      
      if (!video) {
        // Si no se encuentra el video, esperar un poco más
        setTimeout(waitForVideo, 100);
        return;
      }

      // Video encontrado, ahora verificar si está cargado
      console.log('Video found, checking if loaded. ReadyState:', video.readyState);
      this.waitForVideoToLoad(video);
    };

    waitForVideo();
  }

  private waitForVideoToLoad(video: HTMLVideoElement): void {
    // Verificar si el video está completamente cargado
    if (video.readyState >= 4) { // HAVE_ENOUGH_DATA - completamente cargado
      this.videoLoaded = true;
      this.checkAllAssetsLoaded();
      return;
    }

    let eventHandled = false;

    const handleVideoReady = () => {
      if (eventHandled) return;
      
      if (video.readyState >= 4) {
        console.log('Video is ready');
        eventHandled = true;
        this.videoLoaded = true;
        this.checkAllAssetsLoaded();
      }
    };

    // Esperar a que el video esté completamente cargado
    video.addEventListener('canplaythrough', handleVideoReady);
    video.addEventListener('loadeddata', handleVideoReady);
    
    // Evento adicional para asegurar que el video esté completamente descargado
    video.addEventListener('progress', () => {
      if (eventHandled) return;
      
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        // Si el video está completamente descargado (buffered al 100%)
        if (bufferedEnd >= duration * 0.99 && video.readyState >= 4) {
          eventHandled = true;
          this.videoLoaded = true;
          this.checkAllAssetsLoaded();
        }
      }
    });

    // Fallback: si después de 10 segundos no se ha cargado, continuar
    setTimeout(() => {
      if (!eventHandled) {
        console.warn('Video loading timeout - proceeding anyway');
        eventHandled = true;
        this.videoLoaded = true;
        this.checkAllAssetsLoaded();
      }
    }, 10000);
  }

  private checkFontsLoaded(): void {
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        // Fonts are loaded
      });
    }
  }

  private checkAllAssetsLoaded(): void {
    console.log('Checking assets loaded:', { assetsLoaded: this.assetsLoaded, videoLoaded: this.videoLoaded });
    
    if (this.assetsLoaded && this.videoLoaded) {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.minimumLoadingTime - elapsedTime);
      
      console.log('All assets loaded, hiding splash screen in', remainingTime, 'ms');
      
      setTimeout(() => {
        this.hideSplashScreen();
      }, remainingTime);
    }
  }

  private hideSplashScreen(): void {
    this.isHidden = true;
    
    // Emit event after animation completes
    setTimeout(() => {
      this.animationCompleted.emit();
    }, 800); // Match transition duration
  }
}