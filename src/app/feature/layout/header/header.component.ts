import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
/**
 * Services and configs
 */
import { LanguageService, StorageService } from 'src/app/shared/services';
import { LanguageSelection } from 'src/app/shared/services/language.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() data: any; // Input theme data for the header

  languageDropdownItems: any[] = []; // Array to hold language dropdown items
  selectedLanguage: any; // Currently selected language
  subArray: Subscription[] = []; // Array to hold subscriptions for cleanup
  constructor(
    private translateService: TranslateService,
    private storage: StorageService,
    private language: LanguageService
  ) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    const sub = this.language
      .getDefinedLanguages()
      .subscribe((result: LanguageSelection) => {
        const { list, browserLanguage } = result;
        this.languageDropdownItems = list;
        this.selectedLanguage = list.find(l => l.code === browserLanguage);
        this.translateService.setDefaultLang(browserLanguage);
        this.translateService.use(browserLanguage);
      });
    this.subArray.push(sub);
  }

  /* istanbul ignore next */
  changeLanguage(code: string, theme: string): void {
    // If the language is already selected, do nothing
    if (code === this.selectedLanguage.code) {
      return;
    }
    this.selectedLanguage = this.languageDropdownItems.find(
      l => l.code === code
    );
    this.storage.updateLocalStorage(theme, code);
    window.location.reload(); // Reload the page to apply the language change
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions during component destruction
    this.subArray?.forEach(sub => sub?.unsubscribe());
  }
}
