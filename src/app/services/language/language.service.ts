import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: string = 'pt';

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {}

  // tslint:disable-next-line:typedef
  initLanguage(){
    this.translateService.addLangs(['en', 'pt']);
    let language = navigator.language || (navigator as any).userLanguage;
    language = language.split('-').includes('pt') ? 'pt' : 'en';
    this.translateService.setDefaultLang(language);

    // Change the URL without navigate:
    this.location.go(language);
    this.language = language;
  }

  // tslint:disable-next-line:typedef
  changeLanguage(language: string){
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language;
  }
}
