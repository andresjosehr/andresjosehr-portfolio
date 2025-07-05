import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    standalone: false
})
export class JobsComponent implements OnInit, AfterViewInit {

  active = 0

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
    const jobsSection = this.elementRef.nativeElement;

    // Animar título
    const title = jobsSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animar contenedor de tabs
    const tabsContainer = jobsSection.querySelector('.jobs-tabs');
    if (tabsContainer) {
      this.animationsService.observeElement(tabsContainer as HTMLElement, {
        type: 'fadeInUp',
        duration: 1200,
        delay: 300
      });
    }

    // Animar tabs individuales
    const tabs = jobsSection.querySelectorAll('li[ngbNavItem]');
    tabs.forEach((tab: HTMLElement, index: number) => {
      this.animationsService.observeElement(tab, {
        type: 'scaleIn',
        delay: 600 + (index * 150)
      });

      // Añadir efectos hover
      this.animationsService.addHoverEffects(tab, ['lift']);
    });

    // Animar contenido de trabajos (con delay para que aparezcan después de hacer click)
    setTimeout(() => {
      const jobDescriptions = jobsSection.querySelectorAll('.job-description');
      jobDescriptions.forEach((desc: HTMLElement, index: number) => {
        this.animationsService.observeElement(desc, {
          type: 'fadeInLeft',
          delay: index * 200
        });
      });
    }, 1000);
  }
}
