import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import {DataService} from '../../../services/data/data.service';
import {Education} from '../../../model/education.model';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit {

    educations: Education[] = [];

    constructor(
        private dataService: DataService,
        public analyticsService: AnalyticsService) { }

    ngOnInit(): void {
        this.educations = this.dataService.educations;
    }

}
