import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import {DataService} from '../../../services/data/data.service';
import {Education} from '../../../model/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

    educations: Education[] = [];

    constructor(
        private dataService: DataService,
        public analyticsService: AnalyticsService) { }

    ngOnInit(): void {
        this.educations = this.dataService.educations;
    }

}
