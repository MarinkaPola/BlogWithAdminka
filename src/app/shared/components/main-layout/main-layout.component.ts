import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import defaultLanguage from '../../../../assets/i18n/en.json';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
