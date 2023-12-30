import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Fetches the language identifier (langId) from local storage for a given theme.
   *
   * @param theme The theme for which the language identifier is requested. Optional.
   * @returns The language identifier (langId) for the specified theme, or an empty string if not found.
   */
  fetchLanguageId(theme?: string): string {
    // Retrieve theme language information from local storage
    const item = JSON.parse(localStorage.getItem('themeLanguage'));

    if (theme) {
      // Return langId if the theme matches the specified theme
      return item?.theme === theme ? item.langId : '';
    }

    // Return langId for the stored theme
    return item?.langId || '';
  }

   /**
   * Updates the local storage with the selected language and theme information.
   * @param theme The theme associated with the language.
   * @param langId The language identifier to be stored.
   */
   updateLocalStorage(theme: string, langId: string): void {
    // Create an object containing theme and language ID
    const item = {
      theme,
      langId,
    };

    // Convert the object to JSON and store it in local storage
    localStorage.setItem('themeLanguage', JSON.stringify(item));
  }
}
