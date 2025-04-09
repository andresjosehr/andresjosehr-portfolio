import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('animateMenu', [
            transition(':enter', [
                query('*', [
                    style({ opacity: 0, transform: 'translateY(-50%)' }),
                    stagger(50, [
                        animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
                    ])
                ])
            ])
        ])
    ],
    standalone: false
})
export class HeaderComponent implements OnInit {

  responsiveMenuVisible = false;
  pageYPosition: number;
  languageFormControl: UntypedFormControl = new UntypedFormControl();
  cvName = 'Marcel_Luna_DIGIT-TM_II-CV_012025.pdf';

  constructor(
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {

    this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val));

    this.languageFormControl.setValue(this.languageService.language);

  }

  scroll(el: string): void {
    if (document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(() => document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible = false;
  }

  downloadCV(): void{
    this.languageService.translateService.get('header.cv-name').subscribe(val => {
      this.cvName = val;
      console.log(val);
      // app url
      const url: string = window.location.href;
      // Open a new window with the CV
      window.open(url + '/../assets/cv/' + this.cvName, '_blank');
    });

  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event): void {
        this.pageYPosition = window.pageYOffset;
    }

    changeLanguage(language: string): void  {
      this.languageFormControl.setValue(language);
    }
}
