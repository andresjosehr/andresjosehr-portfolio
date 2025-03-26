import { Component, OnInit } from '@angular/core';
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
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.experienceList = this.dataService.experience;
  }

}
