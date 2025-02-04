import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './';

export interface Language {
  name: string;
  code: string;
  imageUrl: string;
}
export interface LanguageSelection {
  browserLanguage: string;
  list: Language[];
}

const LANGUAGES: Language[] = [
  {
    name: 'English',
    code: 'en',
    imageUrl: '../../../assets/images/flags/en.png',
  },
  {
    name: 'Dutch',
    code: 'nl',
    imageUrl: '../../../assets/images/flags/dutch.png',
  },
  {
    name: 'Spanish',
    code: 'es',
    imageUrl: '../../../assets/images/flags/spanish.png',
  },
];

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  definedLanguages: BehaviorSubject<LanguageSelection> = new BehaviorSubject<LanguageSelection>(
    null
  );
  constructor(private storage: StorageService) {}

  broadcastLanguages(data: LanguageSelection): void {
    this.definedLanguages.next(data);
  }

  getDefinedLanguages(): Observable<any> {
    return this.definedLanguages.asObservable();
  }

  /**
   * Identify the country from browser language
   * @returns string
   */
  fetchBrowserPreferedLanguage(): string {
    const re: any =
      /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;

    return re.exec(navigator.language)[3];
  }

  /**
   * Retrieves the browser's preferred language and the list of available languages.
   * @returns An object containing the browser's preferred language and the list of available languages.
   */
  availableLanguageDropdowns(): LanguageSelection {
    // Retrieve the browser's preferred language
    const browserLanguage = this.fetchBrowserPreferedLanguage();

    // Return an object containing the browser's preferred language and the list of available languages
    return {
      browserLanguage,
      list: LANGUAGES, // Assuming LANGUAGES is a predefined list of available languages
    };
  }

  /**
   * Updates the language settings based on the selecting language and available dropdown items.
   * It broadcasts the selected language and updates local storage accordingly.
   * @param selectingLanguage The language to be selected.
   * @param dropdownItems The available language dropdown items.
   * @param theme The theme for which language settings are updated.
   */
  languageSettings(
    selectingLanguage: string,
    dropdownItems: Language[],
    theme: string
  ): void {
    // Retrieve the stored language for the specified theme from local storage
    const storedLanguage = this.storage.fetchLanguageId(theme);

    // Check if a language is stored for the theme
    if (storedLanguage) {
      // Find the stored language in the available dropdown items
      const found = dropdownItems.find(
        ({ code }: Language) => code === storedLanguage
      );

      if (found) {
        // Broadcast the stored language and list of dropdown items
        this.broadcastLanguages({
          browserLanguage: storedLanguage,
          list: dropdownItems,
        });
      } else {
        // Broadcast the first available language if the stored language is not found
        this.broadcastLanguages({
          browserLanguage: dropdownItems[0].code,
          list: dropdownItems,
        });

        // Update local storage with the first available language
        this.storage.updateLocalStorage(theme, dropdownItems[0].code);
      }

      return;
    }

    // Broadcast the selecting language and list of dropdown items
    this.broadcastLanguages({
      browserLanguage: selectingLanguage,
      list: dropdownItems,
    });

    // Update local storage with the selecting language
    this.storage.updateLocalStorage(theme, selectingLanguage);
  }
}
