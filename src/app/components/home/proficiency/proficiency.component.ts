import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-proficiency',
  templateUrl: './proficiency.component.html',
  styleUrls: ['./proficiency.component.scss']
})
export class ProficiencyComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000
  };

  @ViewChild('imgContainer') imgContainer: ElementRef;

  proficiencyList: string[] = [""]

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {



  }

  debug(): void{

    this.imgContainer.nativeElement.scroll({
      top: this.imgContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

}
