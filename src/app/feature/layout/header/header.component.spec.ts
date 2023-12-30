import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { LanguageService, StorageService } from 'src/app/shared/services';
import { of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    let mockLanguageService = {
      getDefinedLanguages: () =>
        of({ list: [{ code: 'en' }], browserLanguage: 'en' }),
    };

    // Mock the StorageService
    const storageSpy = jasmine.createSpyObj('StorageService', [
      'updateLocalStorage',
    ]);

    let mockTranslateService = {
      setDefaultLang: jasmine.createSpy('setDefaultLang'),
      use: jasmine.createSpy('use'),
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [TranslateModule.forRoot(), MatMenuModule],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: StorageService, useValue: storageSpy },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should unsubscribe on destroy', () => {
    const subscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subArray.push(subscription);

    component.ngOnDestroy();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});
