import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StoryService } from './story.service';
import { ApiService } from './api.service';
import { LanguageService } from './language.service';
import { PROGRAM_SAMPLE, isMobile } from '../config';
import { NodeInfo } from 'src/app/feature/story/story.interface';

describe('StoryService', () => {
  let service: StoryService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', [
      'storyTelling',
      'getLanguages',
    ]);
    const translateServiceSpyObj = jasmine.createSpyObj('TranslateService', [
      'instant',
    ]);
    const languageServiceSpyObj = jasmine.createSpyObj('LanguageService', [
      'availableLanguageDropdowns',
      'languageSettings',
    ]);

    TestBed.configureTestingModule({
      providers: [
        StoryService,
        { provide: ApiService, useValue: apiServiceSpyObj },
        { provide: TranslateService, useValue: translateServiceSpyObj },
        { provide: LanguageService, useValue: languageServiceSpyObj },
      ],
    });

    service = TestBed.inject(StoryService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchingMapData', () => {
    it('should call apiService.storyTelling with correct parameters', () => {
      const theme = 'someTheme';
      const id = 'someId';
      const expectedResponse = { program: {}, map: {} }; // Your expected response here

      apiServiceSpy.storyTelling.and.returnValue(of(expectedResponse));

      service.fetchingMapData(theme, id).subscribe();

      expect(apiServiceSpy.storyTelling).toHaveBeenCalledWith(id, 'map', theme);
    });

    it('should process and return the correct response from apiService', (done) => {
      const theme = 'someTheme';
      const id = 'someId';
      const responseData = { program: {}, map: {} }; // Your mock response data here

      apiServiceSpy.storyTelling.and.returnValue(of(responseData));

      service.fetchingMapData(theme, id).subscribe((response) => {
        expect(response).toEqual({
          map: responseData.map,
          program: PROGRAM_SAMPLE
        });
        done();
      });
    });

  });

  describe('fetchingClaims', () => {
    it('should process and return the correct response from apiService', fakeAsync(() => {
      const theme = 'someTheme';
      const id = 'someId';
      const claimData: any[] = [
        {
          id: '234',
          type: 'COMPANY_CLAIM',
          name: 'test',
        },
        {
          id: '24',
          type: 'PRODUCT_CLAIM',
          name: 'test2',
          description_full: 'test2asdasdajskdjasdjk jalksjd lkjasdkl jalkd',
        },
      ]; // Your mock claim data here
      const expectedResponse = {
        batchClaims: [
          {
            id: '24',
            type: 'PRODUCT_CLAIM',
            name: 'test2',
            description_full: 'test2asdasdajskdjasdjk jalksjd lkjasdkl jalkd',
          },
        ],
        companyClaims: [
          {
            id: '234',
            type: 'COMPANY_CLAIM',
            name: 'test',
          },
        ],
      };

      apiServiceSpy.storyTelling.and.returnValue(of(claimData));

      let response;
      service.fetchingClaims(theme, id).subscribe(res => {
        response = res;
      });

      tick(); // Simulate the passage of time until all pending asynchronous activities finish

      expect(response).toEqual(expectedResponse);
    }));
  });

  describe('getActorNames', () => {
    it('should return empty array for null actors', () => {
      const actorNames = service.getActorNames(null);
      expect(actorNames).toEqual([]);
    });

    it('should return empty array for empty actors array', () => {
      const actorNames = service.getActorNames([]);
      expect(actorNames).toEqual([]);
    });

    it('should return actor names if there are 5 or fewer actors', () => {
      const actors = [
        { name: 'Actor1' },
        { name: 'Actor2' },
        { name: 'Actor3' },
      ];
      const actorNames = service.getActorNames(actors);
      expect(actorNames).toEqual(['Actor1', 'Actor2', 'Actor3']);
    });

    it('should return first 4 actor names plus " and more" if there are more than 5 actors', () => {
      const actors = [
        { name: 'Actor1' },
        { name: 'Actor2' },
        { name: 'Actor3' },
        { name: 'Actor4' },
        { name: 'Actor5' },
        { name: 'Actor6' },
      ];
      const actorNames = service.getActorNames(actors);
      expect(actorNames).toEqual([
        'Actor1',
        'Actor2',
        'Actor3',
        'Actor4',
        ' and more',
      ]);
    });
  });

  describe('fetchStageDetails', () => {
    it('should call apiService.storyTelling with correct parameters', () => {
      const theme = 'someTheme';
      const id = 'someId';
      const expectedResponse = [
        {
          /* Mock stage data */
        },
      ]; // Your mock stage data here

      apiServiceSpy.storyTelling.and.returnValue(of(expectedResponse));

      service.fetchStageDetails(theme, id).subscribe();

      expect(apiServiceSpy.storyTelling).toHaveBeenCalledWith(
        id,
        'stage',
        theme
      );
    });

    it('should process and return the correct response from apiService', fakeAsync(() => {
      const stageData: any = [
        {
          actors: [],
          external_sources: [],
          id: 'someId',
        },
      ];

      apiServiceSpy.storyTelling.and.returnValue(of(stageData));

      tick();
    }));
  });

  describe('getActionLink', () => {
    it('should call window.open with correct parameters', () => {
      const url = 'https://example.com';
      spyOn(window, 'open');

      service.getActionLink(url);

      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });
  });

  describe('userFromMobile', () => {
    it('should call isMobile.any', () => {
      const isMobileSpy = spyOn(isMobile, 'any');

      service.userFromMobile();

      expect(isMobileSpy).toHaveBeenCalled();
    });
  });

  describe('shareDataSpecification', () => {
    it('should map theme data properties to share data properties', () => {
      const themeData = {
        share_facebook_title: 'Facebook Title',
        share_linkedin_title: 'LinkedIn Title',
        share_facebook_body: 'Facebook Body',
        share_linkedin_body: 'LinkedIn Body',
        share_whatsapp_title: 'WhatsApp Title',
        share_whatsapp_body: 'WhatsApp Body',
        share_twitter_title: 'Twitter Title',
        share_twitter_body: 'Twitter Body',
      };

      const expectedMappedData = {
        url: encodeURIComponent(window.location.href),
        title: 'Facebook Title',
        description: 'Facebook Body',
        title_linkdin: 'LinkedIn Title',
        description_linkdin: 'LinkedIn Body',
        title_whatsapp: 'WhatsApp Title',
        description_whatsapp: 'WhatsApp Body',
        title_twitter: 'Twitter Title',
        description_twitter: 'Twitter Body',
        redirect_url: window.location.href,
      };

      const mappedData = service.shareDataSpecification(themeData);

      expect(mappedData).toEqual(expectedMappedData);
    });
  });

  describe('placeholderImages', () => {
    it('should generate default placeholder images and image fields', () => {
      const expectedDefaultImages = {
        actor_placeholder: '../../assets/images/actor_placeholder.svg',
        product_placeholder: '../../assets/images/product_placeholder.png',
        farmer_placeholder: '../../assets/images/farmers_placeholder.svg',
      };

      const expectedImageFields = [
        'actor_placeholder',
        'product_placeholder',
        'farmer_placeholder',
      ];

      const { defaultImages, imageFields } = service.placeholderImages();

      expect(defaultImages).toEqual(expectedDefaultImages);
      expect(imageFields).toEqual(expectedImageFields);
    });
  });

  describe('otherResourceDescription', () => {
    it('should generate description and count of "other" resources', () => {
      const other: NodeInfo[] = [
        {
          node: 's',
          node_name: 'Node1',
          external_sources: ['Source1', 'Source2'],
        },
        { node: 's', node_name: 'Node2', external_sources: ['Source3'] },
      ];

      const expectedDescription =
        'Node1 [translation] Source1, Source2. Node2 [translation] Source3.';
      const expectedCount = 3;

      translateServiceSpy.instant.and.callFake(key => {
        return `[translation]`;
      });

      const { otherDescription, otherCount } =
        service.otherResourceDescription(other);

      expect(otherDescription).toEqual(expectedDescription);
      expect(otherCount).toEqual(expectedCount);
    });

    it('should handle empty "other" array', () => {
      const other: any[] = [];

      const { otherDescription, otherCount } =
        service.otherResourceDescription(other);

      expect(otherDescription).toEqual('');
      expect(otherCount).toEqual(0);
    });
  });
});
