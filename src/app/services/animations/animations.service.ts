import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AnimationConfig {
  type: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp' | 'slideInDown' | 'rotateIn' | 'morphIn' | 'glitch' | 'typewriter';
  duration?: number;
  delay?: number;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  private renderer: Renderer2;
  private observer: IntersectionObserver;
  private animatedElements = new Set<Element>();
  private isScrolling$ = new BehaviorSubject<boolean>(false);
  private scrollDirection$ = new BehaviorSubject<'up' | 'down'>('down');
  private lastScrollTop = 0;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initStyles();
    this.initIntersectionObserver();
    this.initScrollListener();
  }

  private initStyles(): void {
    const styles = `
      /* Base animation styles */
      .animate-fade-in-up {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-fade-in-down {
        opacity: 0;
        transform: translateY(-50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-fade-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-fade-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-scale-in {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-slide-in-up {
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-slide-in-down {
        opacity: 0;
        transform: translateY(-100px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-rotate-in {
        opacity: 0;
        transform: rotate(-180deg) scale(0.8);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-morph-in {
        opacity: 0;
        transform: perspective(600px) rotateX(60deg) rotateY(15deg) scale(0.8);
        transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-typewriter {
        opacity: 1;
        border-right: 2px solid rgba(100, 255, 218, 0.8);
        animation: blink-caret 1s infinite;
      }

      @keyframes blink-caret {
        from, to { border-color: rgba(100, 255, 218, 0.8); }
        50% { border-color: transparent; }
      }

      .animate-glitch {
        opacity: 0;
        position: relative;
        transform: translate(-5px) scale(0.95);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .animate-glitch::before,
      .animate-glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .animate-glitch::before {
        color: #ff00ff;
        animation: glitch-1 0.5s infinite;
        z-index: -1;
      }

      .animate-glitch::after {
        color: #00ffff;
        animation: glitch-2 0.5s infinite;
        z-index: -2;
      }

      @keyframes glitch-1 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
      }

      @keyframes glitch-2 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(-2px, 2px); }
        80% { transform: translate(-2px, -2px); }
      }

      /* Active states */
      .animate-fade-in-up.animate-active,
      .animate-fade-in-down.animate-active,
      .animate-fade-in-left.animate-active,
      .animate-fade-in-right.animate-active,
      .animate-scale-in.animate-active,
      .animate-slide-in-up.animate-active,
      .animate-slide-in-down.animate-active,
      .animate-rotate-in.animate-active,
      .animate-morph-in.animate-active {
        opacity: 1;
        transform: translate(0) scale(1) rotate(0) !important;
      }

      .animate-glitch.animate-active {
        opacity: 1;
      }

      .animate-glitch.animate-active::before,
      .animate-glitch.animate-active::after {
        opacity: 0.8;
      }

      /* Hover effects */
      .animate-hover-lift:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      }

      .animate-hover-glow:hover {
        box-shadow: 0 0 30px rgba(100, 255, 218, 0.3);
      }

      /* Stagger animations */
      .animate-stagger-1 { animation-delay: 0.1s; }
      .animate-stagger-2 { animation-delay: 0.2s; }
      .animate-stagger-3 { animation-delay: 0.3s; }
      .animate-stagger-4 { animation-delay: 0.4s; }
      .animate-stagger-5 { animation-delay: 0.5s; }
      .animate-stagger-6 { animation-delay: 0.6s; }
      .animate-stagger-7 { animation-delay: 0.7s; }
      .animate-stagger-8 { animation-delay: 0.8s; }
    `;

    const styleSheet = this.renderer.createElement('style');
    this.renderer.appendChild(styleSheet, this.renderer.createText(styles));
    this.renderer.appendChild(document.head, styleSheet);
  }

  private initIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target as HTMLElement);
        }
      });
    }, options);
  }

  private initScrollListener(): void {
    let scrollTimeout: any;

    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Update scroll direction
      if (currentScrollTop > this.lastScrollTop) {
        this.scrollDirection$.next('down');
      } else {
        this.scrollDirection$.next('up');
      }
      this.lastScrollTop = currentScrollTop;

      // Update scrolling state
      this.isScrolling$.next(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.isScrolling$.next(false);
      }, 150);
    });
  }

  private animateElement(element: HTMLElement): void {
    if (this.animatedElements.has(element)) return;

    this.animatedElements.add(element);

    // Get animation config from data attributes
    const config = this.getElementConfig(element);

    // Apply delay if specified
    if (config.delay) {
      setTimeout(() => {
        this.applyAnimation(element, config);
      }, config.delay);
    } else {
      this.applyAnimation(element, config);
    }
  }

  private getElementConfig(element: HTMLElement): AnimationConfig {
    return {
      type: (element.getAttribute('data-animate') as AnimationConfig['type']) || 'fadeInUp',
      duration: parseInt(element.getAttribute('data-animate-duration') || '800'),
      delay: parseInt(element.getAttribute('data-animate-delay') || '0'),
      easing: element.getAttribute('data-animate-easing') || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      threshold: parseFloat(element.getAttribute('data-animate-threshold') || '0.1'),
      triggerOnce: element.getAttribute('data-animate-once') !== 'false'
    };
  }

  private applyAnimation(element: HTMLElement, config: AnimationConfig): void {
    // Set custom duration and easing if provided
    if (config.duration !== 800) {
      this.renderer.setStyle(element, 'transition-duration', `${config.duration}ms`);
    }

    if (config.easing !== 'cubic-bezier(0.25, 0.46, 0.45, 0.94)') {
      this.renderer.setStyle(element, 'transition-timing-function', config.easing);
    }

    // Apply the active animation class
    this.renderer.addClass(element, 'animate-active');

    // Special handling for glitch effect
    if (config.type === 'glitch') {
      const text = element.textContent || '';
      this.renderer.setAttribute(element, 'data-text', text);
    }

    // Special handling for typewriter effect
    if (config.type === 'typewriter') {
      this.typewriterEffect(element);
    }
  }

  private typewriterEffect(element: HTMLElement): void {
    const text = element.textContent || '';
    element.textContent = '';

    // Añadir clase typewriter con cursor parpadeante
    this.renderer.addClass(element, 'animate-typewriter');
    this.renderer.addClass(element, 'animate-active');

    let i = 0;
    const typeInterval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
        // Quitar cursor después de completar el efecto
        setTimeout(() => {
          this.renderer.removeClass(element, 'animate-typewriter');
          this.renderer.setStyle(element, 'border-right', 'none');
        }, 2000);
      }
    }, 80);
  }

  // Public methods
  public observeElement(element: HTMLElement, config?: Partial<AnimationConfig>): void {
    // Apply config as data attributes if provided
    if (config) {
      Object.entries(config).forEach(([key, value]) => {
        this.renderer.setAttribute(element, `data-animate-${key}`, value.toString());
      });
    }

    // Add the base animation class
    const animationType = config?.type || 'fadeInUp';
    this.renderer.addClass(element, `animate-${animationType.replace(/([A-Z])/g, '-$1').toLowerCase()}`);

    this.observer.observe(element);
  }

  public observeElements(selector: string, config?: Partial<AnimationConfig>): void {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      // Add stagger delay
      const staggerDelay = (config?.delay || 0) + (index * 100);
      const elementConfig = { ...config, delay: staggerDelay };

      this.observeElement(element as HTMLElement, elementConfig);

      // Add stagger class
      if (index < 8) {
        this.renderer.addClass(element, `animate-stagger-${index + 1}`);
      }
    });
  }

  public addHoverEffects(element: HTMLElement, effects: ('lift' | 'glow')[]): void {
    effects.forEach(effect => {
      this.renderer.addClass(element, `animate-hover-${effect}`);
    });
  }

  public getScrollDirection$() {
    return this.scrollDirection$.asObservable();
  }

  public getIsScrolling$() {
    return this.isScrolling$.asObservable();
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements.clear();
  }
}
