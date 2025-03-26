import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {Education} from '../../../model/education.model';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss'],
    standalone: false
})
export class EducationComponent implements OnInit {

    educations: Education[] = [];

    constructor(
        private dataService: DataService) { }

    ngOnInit(): void {
        this.educations = this.dataService.educations;
    }

}
