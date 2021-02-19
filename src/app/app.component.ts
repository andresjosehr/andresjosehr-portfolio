import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'andresjosehr-portfolio';
  
  constructor(
    private titleService: Title,
    private $gaService: GoogleAnalyticsService
    ){
    
  }
  ngOnInit(): void{

    this.titleService.setTitle( "José Andrés | Frontend Developer" );
    
    this.$gaService.pageView('/home', 'Teste de Home')
    
    AOS.init(); 

  }
}
