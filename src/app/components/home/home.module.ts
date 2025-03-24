import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProficiencyComponent } from './proficiency/proficiency.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpLoaderFactory } from '../general/httpLoaderFactory';
import {MoreProyectsComponent} from './more-proyects/more-proyects.component';



@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    ProficiencyComponent,
    MoreProyectsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    CarouselModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ]
})
export class HomeModule { }
