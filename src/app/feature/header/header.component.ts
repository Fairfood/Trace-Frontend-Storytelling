import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
/**
 * Services and configs
 */
import { LanguageService, StorageService } from 'src/app/shared/services';
import { LanguageSelection } from 'src/app/shared/services/language.service';
import { StoryStoreService } from 'src/app/shared/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerData: any; // Input theme data for the header

  languageDropdownItems: any[] = []; // Array to hold language dropdown items
  selectedLanguage: any; // Currently selected language
  subArray: Subscription[] = []; // Array to hold subscriptions for cleanup
  constructor(
    private translateService: TranslateService,
    private storage: StorageService,
    private language: LanguageService,
    private store: StoryStoreService
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

    /**
     * Fetching global store data in header.
     * Changelog: it was passed down from parent component.
     * Changed to store
     */
    const storeSub = this.store.storyConfiguration$.subscribe({
      next: (res: any) => {
        if (res) {
          const { brand_website, brand_logo, name } = res;
          this.headerData = {
            website: brand_website,
            logo: brand_logo,
            name,
          };
        }
      },
    });
    this.subArray.push(storeSub);
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
