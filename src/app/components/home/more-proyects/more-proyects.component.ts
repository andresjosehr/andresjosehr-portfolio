import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    ngAfterViewInit(): void {
      this.initAnimations();
    }

    private initAnimations(): void {
      const moreProjectsSection = this.elementRef.nativeElement;

      // Animar título
      const title = moreProjectsSection.querySelector('.section-title');
      if (title) {
        this.animationsService.observeElement(title.parentElement, {
          type: 'slideInUp',
          duration: 1000
        });
      }

      // Animar tarjetas de proyectos
      const projectCards = moreProjectsSection.querySelectorAll('.proyect-col');
      projectCards.forEach((card: HTMLElement, index: number) => {
        this.animationsService.observeElement(card, {
          type: 'scaleIn',
          duration: 800,
          delay: 200 + (index * 150)
        });

        // Añadir efectos hover a las tarjetas
        this.animationsService.addHoverEffects(card.querySelector('.more-proyect-box') as HTMLElement, ['lift', 'glow']);
      });

      // Animar iconos de folder
      const folderIcons = moreProjectsSection.querySelectorAll('.col-6 img');
      folderIcons.forEach((icon: HTMLElement, index: number) => {
        this.animationsService.observeElement(icon.parentElement as HTMLElement, {
          type: 'rotateIn',
          delay: 400 + (index * 150)
        });
      });

      // Animar links de proyecto
      const projectLinks = moreProjectsSection.querySelectorAll('.project-link');
      projectLinks.forEach((link: HTMLElement, index: number) => {
        this.animationsService.addHoverEffects(link, ['lift', 'glow']);
      });

      // Animar títulos de proyectos
      const projectTitles = moreProjectsSection.querySelectorAll('.other-proyect-title');
      projectTitles.forEach((title: HTMLElement, index: number) => {
        this.animationsService.observeElement(title, {
          type: 'fadeInUp',
          delay: 600 + (index * 150)
        });
      });

      // Animar descripciones
      const descriptions = moreProjectsSection.querySelectorAll('.other-proyect-description');
      descriptions.forEach((desc: HTMLElement, index: number) => {
        this.animationsService.observeElement(desc, {
          type: 'fadeInUp',
          delay: 700 + (index * 150)
        });
      });

      // Animar tecnologías
      const techItems = moreProjectsSection.querySelectorAll('.technology-item');
      techItems.forEach((tech: HTMLElement, index: number) => {
        this.animationsService.observeElement(tech, {
          type: 'scaleIn',
          delay: 900 + (Math.floor(index / 4) * 150) + ((index % 4) * 50)
        });

        // Añadir efectos hover a las tecnologías
        this.animationsService.addHoverEffects(tech, ['lift']);
      });
    }

    redirect(route: string, event) {
      const id = event.target.id;
      if(id=='demoLink' || id=='ghLink'){
        return
      }
      window.open(route, '_blank');
    }
}
