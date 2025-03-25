import { Injectable } from '@angular/core';
import {Education} from '../../model/education.model';
import {AboutMe} from '../../model/about-me.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public aboutMe: AboutMe[] = [
    {
      id: 1,
      description: 'I describe myself as a developer who loves coding, open source, and the web platform. Currently I\'m working at <span class=\'underline\'>European Commission</span> as a IT Consulting with a role of <span class=\'underline\'>Application/Cloud Architect</span> and founder of <span class=\'underline\'>M2L Solutions</span>, my own I.T Company'
    },
    {
      id: 2,
      description: 'I play a pivotal role in designing and implementing software solutions that meet business needs while ensuring scalability, security, and efficiency.',
    },
    {
      id: 3,
      description: 'Experience in the full software development lifecycle, working with analysis, design, coding, and promotion into production, creating elegant solutions using Java, PHP, C#, HTML, CSS, JavaScript, Spring Boot, Angular, bootstrap and ElasticSearch.',
    },
    {
      id: 4,
      description: 'Competence to jump between frontend and backend work, performing tests, integrations and process automation using REST APIs, handling multiple types of calls, returning different data formats and changing structurally, when necessary.',
    },
    {
      id: 5,
      description: 'Ability to support ongoing business requirements, maintaining and enhancing existing systems, offering client-based experiences and applying strong problem-solving skills with a get it done attitude.',
    },
    {
      id: 6,
      description: 'Expertise to work closely with Product Owners, Analysts and QA in an Agile environment to ensure quality and security of applications, and to ensure code meets development standards and guidelines.',
    },
    {
      id: 7,
      description: 'Experience with reviewing the architecture of existing systems and designing the architecture of new ones, deciding on all the technical components of an application, acting as a liaison between the developers and the project leaders.',
    },
    {
      id: 8,
      description: 'I like to study, music, games, movies and series. After my little ones I can´t find spare time for all of that, but when I do have time, I try to enjoy with my family.'
    }
  ];

  public expirience;

  public proficiency;

  public educations: Education[] = [{
    id: 1,
    title: 'Graduated in Computer Science',
    date: 'January 2020',
    description: [
      'Graduated since 2006, at Faculty of Technology and Science of Feira de Santana - Bahia'
    ]
  },
    {
      id: 2,
      title: 'Lato Sensu in Software Engineering',
      date: 'December 2018 - December 2019',
      description: [
        'Concluded in 2014, the specialization in Software engineering at Ruy Barbosa University.'
      ]
    },
    {
      id: 3,
      title: 'MBA in Project Management',
      date: 'May 2015 - July 2018',
      description: [
        'Not complete course of Graduated Business degree at Faculdade Ruy Barbosa, at Salvador Bahia.'
      ]
    }];



  constructor() {}
}
