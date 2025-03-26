import { Component, OnInit } from '@angular/core';
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
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.descriptions = this.dataService.aboutMe;
  }

}
