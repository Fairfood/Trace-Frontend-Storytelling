import { TestBed } from '@angular/core/testing';
import { ClaimDetailsService } from './claim-details.service';
import { DomSanitizer } from '@angular/platform-browser';

describe('ClaimDetailsService', () => {
  let service: ClaimDetailsService;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const sanitizerSpyObj = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ClaimDetailsService,
        { provide: DomSanitizer, useValue: sanitizerSpyObj },
      ],
    });

    service = TestBed.inject(ClaimDetailsService);
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getInterventionData', () => {
    it('should return intervention data', () => {
      const mockIntervention = {
        interventions: [
          {
            id: '1',
            name: 'Intervention 1',
            description: 'Description 1',
            image_url: 'image1.jpg',
            external_link: 'external1.com',
          },
        ],
      };

      const result = service.getInterventionData(mockIntervention);
      expect(result?.length).toBe(1);
      expect(result[0].id).toBe('1');
      expect(result[0].title).toBe('Intervention 1');
    });

    it('should handle undefined interventions', () => {
      const result = service.getInterventionData(undefined);
      expect(result?.length).toBe(0);
    });
  });

  describe('configureFileObject', () => {
    it('should configure file object for PDF', () => {
      const fileObject = { file: 'example.pdf' };
      sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('safeUrl');

      const result = service.configureFileObject(fileObject);

      expect(result.viewer).toBe('pdfviewer');
      expect(result.url).toBe('safeUrl');
      expect(result.fileUrl).toBe('safeUrl');
      expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        'example.pdf'
      );
    });

    it('should configure file object for OneDrive-supported types', () => {
      const fileObject = { file: 'example.ppt' };
      sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('safeUrl');

      const result = service.configureFileObject(fileObject);

      expect(result.viewer).toBe('onedrive');
      expect(result.url).toBe('safeUrl');
      expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        'https://view.officeapps.live.com/op/embed.aspx?src=example.ppt'
      );
    });

    it('should configure file object for image', () => {
      const fileObject = { file: 'image.jpg' };

      const result = service.configureFileObject(fileObject);

      expect(result.viewer).toBe('image');
      expect(result.url).toBe('image.jpg');
      expect(
        sanitizerSpy.bypassSecurityTrustResourceUrl
      ).not.toHaveBeenCalled();
    });
  });
});
