import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

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
    const aboutSection = this.elementRef.nativeElement;

    // Animar título
    const title = aboutSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animar párrafos con stagger
    const paragraphs = aboutSection.querySelectorAll('.about-description p');
    paragraphs.forEach((p: HTMLElement, index: number) => {
      this.animationsService.observeElement(p, {
        type: 'fadeInLeft',
        duration: 800,
        delay: 200 + (index * 300)
      });
    });

    // Animar lista de skills
    const skillsList = aboutSection.querySelector('.skills-list');
    if (skillsList) {
      this.animationsService.observeElement(skillsList as HTMLElement, {
        type: 'fadeInUp',
        delay: 800
      });
    }

    // Animar skills individuales con stagger
    const skills = aboutSection.querySelectorAll('.skill-element');
    skills.forEach((skill: HTMLElement, index: number) => {
      this.animationsService.observeElement(skill, {
        type: 'scaleIn',
        delay: 1000 + (index * 100)
      });

      // Añadir efectos hover
      this.animationsService.addHoverEffects(skill, ['lift', 'glow']);
    });

    // Animar imagen
    const imageContainer = aboutSection.querySelector('.about-img-container');
    if (imageContainer) {
      this.animationsService.observeElement(imageContainer as HTMLElement, {
        type: 'morphIn',
        duration: 1200,
        delay: 600
      });
    }

    // Animar imagen con efectos hover
    const image = aboutSection.querySelector('.about-image');
    if (image) {
      this.animationsService.addHoverEffects(image as HTMLElement, ['lift']);
    }
  }
}
