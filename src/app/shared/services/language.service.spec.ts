import { TestBed } from '@angular/core/testing';

import { LanguageService, StorageService } from './';
import { LanguageSelection } from './language.service';

class StorageServiceMock {
  fetchLanguageId(theme: string): string {
    return 'en';
  }

  updateLocalStorage(theme: string, languageCode: string): void {
    console.log(theme, languageCode);
  }
}

describe('LanguageService', () => {
  let service: LanguageService;
  let storageServiceMock: StorageServiceMock;

  beforeEach(() => {
    storageServiceMock = new StorageServiceMock();

    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageServiceMock }],
    });

    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should broadcast languages', () => {
    const testData: LanguageSelection = {
      browserLanguage: 'en',
      list: [
        {
          name: 'English',
          code: 'en',
          imageUrl: 'path/to/en.png',
        },
      ],
    };
    const spy = spyOn(service['definedLanguages'], 'next');
    service.broadcastLanguages(testData);
    expect(spy).toHaveBeenCalledWith(testData);
  });

  it('should fetch browser preferred language', () => {
    const language = service.fetchBrowserPreferedLanguage();
    expect(language).toEqual('en');
    expect(language).toBeTruthy();
  });
});
