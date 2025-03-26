import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import {LanguageService} from 'src/app/services/language/language.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit{
  title = 'marcelluna-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{
    this.languageService.initLanguage();

    this.titleService.setTitle('Marcel Luna @ M2L Solutions | FullStack Developer');

    this.metaService.addTags([
      {name: 'keywords', content: 'fullstack, software, developer, java, angular, css'},
      {name: 'description', content: 'I have more then 13 years of experience in IT with a Bachelor\'s Degree in Computer Science and specialization in software engineer but I\'m self-taught and like to apply new technologies when they are mature enough and it\'s the best fit for the project.'},
    ]);

    AOS.init();

  }
}
