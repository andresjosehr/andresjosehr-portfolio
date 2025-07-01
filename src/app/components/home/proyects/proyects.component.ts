import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit, AfterViewInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout:3000
  }

  @ViewChild('imgContainer') imgContainer: ElementRef;

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    const projectsSection = this.elementRef.nativeElement;

    // Animar título
    const title = projectsSection.querySelector('.section-title');
    if (title) {
      this.animationsService.observeElement(title.parentElement, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animar contenedores de proyectos
    const projectContainers = projectsSection.querySelectorAll('.proyect-container');
    projectContainers.forEach((container: HTMLElement, index: number) => {
      this.animationsService.observeElement(container, {
        type: 'morphIn',
        duration: 1200,
        delay: 300 + (index * 400)
      });
    });

    // Animar imágenes de proyectos
    const projectImages = projectsSection.querySelectorAll('.project-image');
    projectImages.forEach((img: HTMLElement, index: number) => {
      this.animationsService.observeElement(img.closest('.img-feature-proyect-container') as HTMLElement, {
        type: 'scaleIn',
        duration: 1000,
        delay: 500 + (index * 400)
      });

      // Añadir efectos hover a las imágenes
      this.animationsService.addHoverEffects(img, ['lift', 'glow']);
    });

    // Animar títulos de proyectos con efecto glitch
    const projectNames = projectsSection.querySelectorAll('.proyect-name');
    projectNames.forEach((name: HTMLElement, index: number) => {
      this.animationsService.observeElement(name, {
        type: 'glitch',
        delay: 800 + (index * 400)
      });
    });

    // Animar descripciones
    const descriptions = projectsSection.querySelectorAll('.proyect-description-box');
    descriptions.forEach((desc: HTMLElement, index: number) => {
      this.animationsService.observeElement(desc, {
        type: 'fadeInRight',
        duration: 800,
        delay: 900 + (index * 400)
      });
    });

    // Animar skills con stagger
    const skillsLists = projectsSection.querySelectorAll('.ul-skills');
    skillsLists.forEach((list: HTMLElement, index: number) => {
      this.animationsService.observeElement(list, {
        type: 'fadeInUp',
        delay: 1000 + (index * 400)
      });
    });

    // Animar skills individuales
    const skillItems = projectsSection.querySelectorAll('.skill-item');
    skillItems.forEach((skill: HTMLElement, index: number) => {
      this.animationsService.observeElement(skill, {
        type: 'scaleIn',
        delay: 1100 + (Math.floor(index / 5) * 400) + ((index % 5) * 100)
      });

      // Añadir efectos hover
      this.animationsService.addHoverEffects(skill, ['lift', 'glow']);
    });

    // Animar botones de proyecto
    const projectButtons = projectsSection.querySelectorAll('.project-btn');
    projectButtons.forEach((btn: HTMLElement, index: number) => {
      this.animationsService.observeElement(btn.closest('.buttons-container') as HTMLElement, {
        type: 'fadeInUp',
        delay: 1200 + (Math.floor(index / 2) * 400)
      });

      // Añadir efectos hover especiales a los botones
      this.animationsService.addHoverEffects(btn, ['lift', 'glow']);
    });
  }

  debug(){
    this.imgContainer.nativeElement.scroll({
      top: this.imgContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}
