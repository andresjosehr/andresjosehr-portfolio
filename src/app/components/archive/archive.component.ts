import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, query, stagger, style, animate, transition } from "@angular/animations"

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  animations:[
    trigger("archiveAnimation", [
      transition(":enter", [
        query("*", [
          style({opacity: 0, transform: "translateY(100%)"}),
          stagger(15, [
            animate(
              "500ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
            ])
          ])
        ])
      ])
    ]
  })
export class ArchiveComponent implements OnInit, AfterViewInit {

  public state: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
        this.state=true;
    }, 1);
  }

}
