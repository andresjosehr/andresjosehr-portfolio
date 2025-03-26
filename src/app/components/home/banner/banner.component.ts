import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {trigger, style, animate, transition, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(50, [
            animate(
              '250ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  sayHi(): void {
    const contact: string = 'contact';
    this.router.navigate(['/home']).then(() => document.getElementById(contact).scrollIntoView({behavior: 'smooth'}));
  }

}
