import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { GeneralModule } from './components/general/general.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    /* ArchiveComponent */
  ],
  imports: [
    BrowserAnimationsModule,

    HomeModule,
    GeneralModule,

    AnimateOnScrollModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxGoogleAnalyticsModule.forRoot(environment.trackAnalyticID),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
