import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve languages for a specific entity', () => {
    const entity = 'exampleEntity';
    const mockResponse = {
      /* your mock response here */
    };

    service.getLanguages(entity).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${BASE_URL}/dashboard/ci-theme-language/${entity}/`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });
});
