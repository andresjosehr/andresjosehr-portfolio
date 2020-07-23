import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  
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

  @HostListener('window:scroll', ['doSomething($event)']) 
    doSomething(event) {
        this.pageYPosition=window.pageYOffset     
    }
}
