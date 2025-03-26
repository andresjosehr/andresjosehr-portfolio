import { Injectable } from '@angular/core';
import {Education} from '../../model/education.model';
import {AboutMe} from '../../model/about-me.model';
import {Experience} from '../../model/experience.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public aboutMe: AboutMe[] = [
    {
      id: 1,
      description: 'about-me.description-01'
    },
    {
      id: 2,
      description: 'about-me.description-02',
    },
    {
      id: 3,
      description: 'about-me.description-03',
    },
    {
      id: 4,
      description: 'about-me.description-04',
    },
    {
      id: 5,
      description: 'about-me.description-05',
    },
    {
      id: 6,
      description: 'about-me.description-06',
    },
    {
      id: 7,
      description: 'about-me.description-07',
    },
    {
      id: 8,
      description: 'about-me.description-08'
    }
  ];

  public experience: Experience[] =  [
    {
      id: 1,
      companyName: 'experience.01.company-name',
      title: 'experience.01.title',
      date : 'experience.01.date',
      description: [
        'experience.01.description-01',
        'experience.01.description-02',
        'experience.01.description-03',
        'experience.01.description-04',
        'experience.01.description-05',
        'experience.01.description-06',
        'experience.01.description-07',
        'experience.01.description-08',
        'experience.01.description-09',
        'experience.01.description-10',
        'experience.01.description-11',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 2,
      companyName: 'experience.02.company-name',
      title: 'experience.02.title',
      date : 'experience.02.date',
      description: [
        'experience.02.description-01',
        'experience.02.description-02',
        'experience.02.description-03',
        'experience.02.description-04',
        'experience.02.description-05',
        'experience.02.description-06',
        'experience.02.description-07',
        'experience.02.description-08',
        'experience.02.description-09',
        'experience.02.description-10',
        'experience.02.description-11',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 3,
      companyName: 'experience.03.company-name',
      title: 'experience.03.title',
      date : 'experience.03.date',
      description: [
        'experience.03.description-01',
        'experience.03.description-02',
        'experience.03.description-03',
        'experience.03.description-04',
        'experience.03.description-05',
        'experience.03.description-06',
        'experience.03.description-07',
        'experience.03.description-08',
        'experience.03.description-09',
        'experience.03.description-10',
        'experience.03.description-11',
        'experience.03.description-12',
        'experience.03.description-13',
        'experience.03.description-14',
        'experience.03.description-15',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 4,
      companyName: 'experience.04.company-name',
      title: 'experience.04.title',
      date : 'experience.04.date',
      description: [
        'experience.04.description-01',
        'experience.04.description-02',
        'experience.04.description-03',
        'experience.04.description-04',
        'experience.04.description-05',
        'experience.04.description-06',
        'experience.04.description-07',
        'experience.04.description-08',
        'experience.04.description-09',
        'experience.04.description-10',
        'experience.04.description-11',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 5,
      companyName: 'experience.05.company-name',
      title: 'experience.05.title',
      date : 'experience.05.date',
      description: [
        'experience.05.description-01',
        'experience.05.description-02',
        'experience.05.description-03',
        'experience.05.description-04',
        'experience.05.description-05',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 6,
      companyName: 'experience.06.company-name',
      title: 'experience.06.title',
      date : 'experience.06.date',
      description: [
        'experience.06.description-01',
        'experience.06.description-02',
        'experience.06.description-03',
        'experience.06.description-04',
        'experience.06.description-05',
        'experience.06.description-06',
        'experience.06.description-07',
        'experience.06.description-08',
        'experience.06.description-09',
      ],
      technologies: ['label.angular', 'label.css', 'label.sass', 'label.oracle'],
      iconSet: ''
    },
    {
      id: 7,
      companyName: 'experience.07.company-name',
      title: 'experience.07.title',
      date : 'experience.07.date',
      description: [
        'experience.07.description-01',
        'experience.07.description-02',
        'experience.07.description-03',
        'experience.07.description-04',
        'experience.07.description-05',
        'experience.07.description-06',
        'experience.07.description-07',
      ],
      technologies: ['Angular', 'CSS GRID', 'SASS', 'Angular animations'],
      iconSet: ''
    },
    {
      id: 8,
      companyName: 'experience.08.company-name',
      title: 'experience.08.title',
      date : 'experience.08.date',
      description: [
        'experience.08.description-01',
        'experience.08.description-02',
        'experience.08.description-03',
        'experience.08.description-04',
        'experience.08.description-05',
        'experience.08.description-06',
        'experience.08.description-07',
        'experience.08.description-08',
        'experience.08.description-09',
      ],
      technologies: ['Angular', 'CSS GRID', 'SASS', 'Angular animations'],
      iconSet: ''
    },
    {
      id: 9,
      companyName: 'experience.09.company-name',
      title: 'experience.09.title',
      date : 'experience.09.date',
      description: [
        'experience.09.description-01',
        'experience.09.description-02',
        'experience.09.description-03',
        'experience.09.description-04',
      ],
      technologies: ['label.html', 'label.office', 'label.web-server', 'label.linux'],
      iconSet: ''
    }
  ];

  public educations: Education[] = [{
    id: 1,
    title: 'education.01.title',
    date: 'education.01.date',
    description: 'education.01.description'
  },
    {
      id: 2,
      title: 'education.02.title',
      date: 'education.02.date',
      description: 'education.02.description'
    },
    {
      id: 3,
      title: 'education.03.title',
      date: 'education.03.date',
      description: 'education.03.description'
    }];

  constructor() {}
}
