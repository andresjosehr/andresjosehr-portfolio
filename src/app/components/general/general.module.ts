import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    TranslateModule.forRoot()
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class GeneralModule { }
