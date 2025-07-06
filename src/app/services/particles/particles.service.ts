import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.size = Math.random() * 3 + 2;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los bordes
    if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Configurar shadow más sutil
    ctx.shadowColor = 'rgba(100, 255, 218, 0.1)';
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 255, 218, 0.3)'; // Más opaco -> más sutil
    ctx.fill();

    // Resetear shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticlesService {
  private renderer: Renderer2;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId?: number;
  private isInitialized = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init(): void {
    if (this.isInitialized) return;

    console.log('Inicializando partículas globales...');
    this.createCanvas();
    this.initParticles();
    this.startAnimation();
    this.bindResizeEvent();
    this.isInitialized = true;
    console.log('Partículas inicializadas:', this.particles.length, 'partículas creadas');
  }

  destroy(): void {
    if (!this.isInitialized) return;

    console.log('Destruyendo partículas...');
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.canvas) {
      this.renderer.removeChild(document.body, this.canvas);
    }

    this.particles = [];
    this.isInitialized = false;
  }

  private createCanvas(): void {
    this.canvas = this.renderer.createElement('canvas');
    this.renderer.addClass(this.canvas, 'global-particles-canvas');

    // Estilos para el canvas
    this.renderer.setStyle(this.canvas, 'position', 'fixed');
    this.renderer.setStyle(this.canvas, 'top', '0');
    this.renderer.setStyle(this.canvas, 'left', '0');
    this.renderer.setStyle(this.canvas, 'width', '100%');
    this.renderer.setStyle(this.canvas, 'height', '100%');
    this.renderer.setStyle(this.canvas, 'z-index', '0');
    this.renderer.setStyle(this.canvas, 'pointer-events', 'none');

    this.renderer.appendChild(document.body, this.canvas);

    // Configurar canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private initParticles(): void {
    // Crear más partículas para que se vean bien en toda la página
    for (let i = 0; i < 80; i++) {
      this.particles.push(new Particle());
    }
  }

  private startAnimation(): void {
    if (!this.ctx || !this.canvas) return;

    const animate = () => {
      this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

      // Dibujar partículas
      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx!);
      });

      // Conectar partículas cercanas
      this.connectParticles();

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  private connectParticles(): void {
    if (!this.ctx) return;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          const opacity = (120 - distance) / 120 * 0.2; // Reducido de 0.5 a 0.2
          this.ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private bindResizeEvent(): void {
    this.renderer.listen(window, 'resize', () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });
  }
}
