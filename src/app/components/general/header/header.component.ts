import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
    trigger("animateMenu",[
      transition(":enter",[
        query("*", [
          style({opacity: 0, transform: "translateY(-100%)"}),
          stagger(50,[
            animate(
              "500ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit, AfterViewInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  state: boolean = false;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  scroll(el) {
    if(document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(()=> document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible=false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.state=true
    }, 1000);
  }

  @HostListener('window:scroll', ['getScrollPosition($event)']) 
    getScrollPosition(event) {
        this.pageYPosition=window.pageYOffset     
    }
}
