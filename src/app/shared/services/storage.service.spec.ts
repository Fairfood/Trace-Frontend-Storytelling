import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear(); // Clear local storage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchLanguageId', () => {
    it('should return empty string if local storage is empty', () => {
      const langId = service.fetchLanguageId();
      expect(langId).toEqual('');
    });

    it('should return empty string if theme does not match', () => {
      localStorage.setItem(
        'themeLanguage',
        JSON.stringify({ theme: 'invalidTheme', langId: 'en' })
      );
      const langId = service.fetchLanguageId('theme');
      expect(langId).toEqual('');
    });

    it('should return langId if theme matches', () => {
      const testTheme = 'testTheme';
      const testLangId = 'en';
      localStorage.setItem(
        'themeLanguage',
        JSON.stringify({ theme: testTheme, langId: testLangId })
      );
      const langId = service.fetchLanguageId(testTheme);
      expect(langId).toEqual(testLangId);
    });
  });

  describe('updateLocalStorage', () => {
    it('should update local storage with theme and langId', () => {
      const testTheme = 'testTheme';
      const testLangId = 'en';
      service.updateLocalStorage(testTheme, testLangId);
      const storedItem = JSON.parse(localStorage.getItem('themeLanguage'));
      expect(storedItem).toEqual({ theme: testTheme, langId: testLangId });
    });
  });
});
