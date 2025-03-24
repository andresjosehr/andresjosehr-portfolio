import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { GeneralModule } from './components/general/general.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpLoaderFactory } from './components/general/httpLoaderFactory';

@NgModule({ declarations: [
        AppComponent,
        /* ArchiveComponent */
    ],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule,
        HomeModule,
        GeneralModule,
        // AnimateOnScrollModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        // NgxGoogleAnalyticsModule.forRoot(environment.trackAnalyticID),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgbModule], providers: [TranslateService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
