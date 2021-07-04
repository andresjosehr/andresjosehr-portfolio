import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit(): void {
    this.analyticsService.sendAnalyticPageView("/inicio", "Se entro a inicio")
  }


}
