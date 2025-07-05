import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0 }))
            ])
        ]),
        trigger('zoomIn', [
            transition(':enter', [
                style({ transform: 'scale(0.3)', opacity: 0 }),
                animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ])
        ])
    ],
    standalone: false
})
export class AboutComponent implements OnInit, AfterViewInit {

  isImageModalOpen = false;

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

  onImageClick(): void {
    this.analyticsService.sendAnalyticEvent("click_image", "about", "image");
    this.openImageModal();
  }

  openImageModal(): void {
    this.isImageModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeImageModal();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeImageModal();
    }
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
  }
}
