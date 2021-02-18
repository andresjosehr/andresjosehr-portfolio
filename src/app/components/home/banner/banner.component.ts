import { Component, OnInit, AfterViewInit } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit, AfterViewInit {

  public state: boolean;

  constructor() { }

  ngOnInit(): void {
   
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.state=true;  
    }, 1000);
    
  }
  

}
