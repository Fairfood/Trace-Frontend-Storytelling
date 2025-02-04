import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { LinkedinData, SocialShareService } from './social-share.service';

describe('SocialShareService', () => {
  let service: SocialShareService;
  let metaServiceSpy: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Meta', ['updateTag']);

    TestBed.configureTestingModule({
      providers: [SocialShareService, { provide: Meta, useValue: spy }],
    });

    service = TestBed.inject(SocialShareService);
    metaServiceSpy = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateTitle', () => {
    it('should update meta tags for social sharing', () => {
      const testData: LinkedinData = {
        title: 'Test Title',
        description: 'Test Description',
        url: 'https://example.com',
      };

      service.updateTitle(testData);

      expect(metaServiceSpy.updateTag.calls.count()).toBe(7);

      // Check Open Graph (og) meta tags
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: testData.title,
      });
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: testData.description,
      });
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: testData.url,
      });

      // Check Twitter meta tags
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        name: 'twitter:title',
        content: testData.title,
      });
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        name: 'twitter:description',
        content: testData.description,
      });

      // Check other meta tags
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: testData.description,
      });
      expect(metaServiceSpy.updateTag).toHaveBeenCalledWith({
        itemprop: 'description',
        content: testData.description,
      });
    });
  });
});
