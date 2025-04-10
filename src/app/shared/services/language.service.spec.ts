import { TestBed } from '@angular/core/testing';

import { LanguageService, StorageService } from './';
import { Language, LanguageSelection } from './language.service';
import { BehaviorSubject } from 'rxjs';

describe('LanguageService', () => {
  let service: LanguageService;
  let storageServiceMock: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageServiceMock = jasmine.createSpyObj('StorageService', [
      'fetchLanguageId',
      'updateLocalStorage',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageServiceMock }],
    });

    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return definedLanguages observable', (done: DoneFn) => {
    // Arrange
    const testData: Language[] = [
      { code: '1', name: 'English', imageUrl: 'path/to/en.png' },
      { code: '2', name: 'Spanish', imageUrl: 'path/to/en.png' },
    ];

    const test = {
      browserLanguage: 'en',
      list: testData,
    };

    // Set up definedLanguages subject with test data
    service.definedLanguages = new BehaviorSubject(test);

    service.getDefinedLanguages().subscribe(languages => {
      expect(languages).toEqual(test);
      done();
    });
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

  it('availableLanguageDropdowns', () => {
    spyOn(service, 'fetchBrowserPreferedLanguage').and.returnValue('en');
    const testData = service.availableLanguageDropdowns();
    expect(testData.browserLanguage).toEqual('en');
  });

  describe('languageSettings', () => {
    it('should return lang settings', () => {
      spyOn(service, 'broadcastLanguages');
      storageServiceMock.fetchLanguageId.and.returnValue('en');
      service.languageSettings(
        'en',
        [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
        'theme'
      );

      expect(storageServiceMock.fetchLanguageId).toHaveBeenCalledWith('theme');
      expect(service.broadcastLanguages).toHaveBeenCalledWith({
        browserLanguage: 'en',
        list: [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
      });
    });

    it('should return default lang settings', () => {
      spyOn(service, 'broadcastLanguages');
      storageServiceMock.fetchLanguageId.and.returnValue('es');
      service.languageSettings(
        'es',
        [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
        'theme'
      );

      expect(storageServiceMock.fetchLanguageId).toHaveBeenCalledWith('theme');
      expect(service.broadcastLanguages).toHaveBeenCalledWith({
        browserLanguage: 'en',
        list: [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
      });
    });

    it('No stored language', () => {
      spyOn(service, 'broadcastLanguages');
      storageServiceMock.fetchLanguageId.and.returnValue('');
      service.languageSettings(
        'en',
        [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
        'theme'
      );

      expect(storageServiceMock.fetchLanguageId).toHaveBeenCalledWith('theme');
      expect(service.broadcastLanguages).toHaveBeenCalledWith({
        browserLanguage: 'en',
        list: [
          {
            name: 'English',
            code: 'en',
            imageUrl: 'path/to/en.png',
          },
        ],
      });

      expect(storageServiceMock.updateLocalStorage).toHaveBeenCalled();
    });
  });
});
