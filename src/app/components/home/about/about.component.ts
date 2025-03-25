import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import {DataService} from '../../../services/data/data.service';
import {AboutMe} from '../../../model/about-me.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  descriptions: AboutMe[];

  constructor(
    public analyticsService: AnalyticsService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.descriptions = this.dataService.aboutMe;
  }

}
