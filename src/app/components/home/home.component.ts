import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private $gaService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.$gaService.pageView('/inicio', 'Test de inicio')
  }

}
