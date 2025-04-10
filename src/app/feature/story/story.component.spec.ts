import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { StoryComponent } from './story.component';
import { SocialShareService } from 'src/app/shared/services';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let mockActivatedRoute: any;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockSocialShareService: Partial<SocialShareService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: { entity: 'ThemeCaching' },
        queryParams: { batch: 'eQQna' },
      },
    };

    mockSocialShareService = {
      updateTitle: jasmine.createSpy('updateTitle'),
    };

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [StoryComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: SocialShareService, useValue: mockSocialShareService },
      ],
      imports: [HttpClientModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initializeData with correct parameters', () => {
      spyOn(component, 'initializeData');

      component.ngOnInit();

      expect(component.initializeData).toHaveBeenCalledWith(
        'ThemeCaching',
        'eQQna'
      );
    });
  });

  describe('initializeData', () => {
    it('should set invalidLink to false and call fetchThemeLanguages when entity is provided', () => {
      spyOn(component, 'fetchThemeLanguages');
      component.initializeData('ThemeCaching', 'eQQna');

      expect(component.invalidLink).toBeFalse();
      expect(component.fetchThemeLanguages).toHaveBeenCalled();
    });

    it('should set invalidLink to true when entity is not provided', () => {
      component.initializeData('', 'eQQna');

      expect(component.invalidLink).toBeTrue();
    });
  });

  describe('getClaimDetails', () => {
    it('should fetch claim details correctly', () => {
      spyOn(component.storyService, 'fetchingClaims').and.returnValue(
        of({ batchClaims: [], companyClaims: [] })
      );

      component.getClaimDetails('theme', 'id');

      expect(component.companyClaims).toEqual([]);
      expect(component.batchClaims).toEqual([]);
      expect(component.primaryClaimIndex).toEqual(0);
    });
  });

  describe('getActorData', () => {
    it('should fetch actor data correctly', () => {
      spyOn(component.storyService, 'fetchingMapData').and.returnValue(
        of({
          program: {
            program_stats_details: [],
          },
          map: [],
        })
      );

      component.getActorData('theme', 'id');

      expect(component.programSection).toEqual({
        program_stats_details: [],
      });
      expect(component.mapActors).toEqual([]);
      expect(component.dataLoading).toBeFalse();
    });
  });

  describe('setSlider', () => {
    it('should set slider correctly', () => {
      const farmers = [
        {
          name: 'John',
          province: 'Ontario',
          country: 'Canada',
          image: 'image1.jpg',
        },
      ];

      component.setSlider(farmers);

      expect(component.imagesUrl).toEqual([
        { imageUrl: 'image1.jpg', title: 'John', subTitle: 'Ontario, Canada' },
      ]);
    });
  });

  describe('getLink', () => {
    it('should call getActionLink from storyService', () => {
      spyOn(component.storyService, 'getActionLink');
      component.themeData = {
        action_button_url: 'someUrl',
      };

      component.getLink();

      expect(component.storyService.getActionLink).toHaveBeenCalledWith(
        'someUrl'
      );
    });
  });

  describe('companyClaim', () => {
    it('should call claimDetails with correct data', () => {
      spyOn(component, 'claimDetails');
      const data = { id: '123', name: 'Company XYZ' };
      component.companyClaims = [{ claim_id: '123' }];

      component.openCompanyClaim(data);

      expect(component.claimDetails).toHaveBeenCalledWith({ claim_id: '123' });
    });
  });
});
