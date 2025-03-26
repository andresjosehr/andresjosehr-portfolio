import { Component, OnInit } from '@angular/core';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    animations: [
        trigger('animateFooter', [
            transition(':enter', [
                query('*', [
                    style({ opacity: 0, transform: 'translateY(100%)' }),
                    stagger(50, [
                        animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
                    ])
                ])
            ])
        ])
    ],
    standalone: false
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
