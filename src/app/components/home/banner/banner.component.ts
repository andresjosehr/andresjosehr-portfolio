import { Component, OnInit, AfterViewInit } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('aniBoton', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-100px)" }),
          stagger(100, [
            animate(
              "500ms cubic-bezier(0.35, 0, 0.25, 1)",
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
