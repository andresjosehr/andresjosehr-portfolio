import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import {DataService} from '../../../services/data/data.service';
import {Experience} from '../../../model/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  active = 0;
  experienceList: Experience[];

  constructor(
    public analyticsService: AnalyticsService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.experienceList = this.dataService.experience;
  }

}
