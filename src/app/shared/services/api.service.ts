import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// other services used
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
// configs and constants
import { environment } from 'src/environments/environment';
import { apiFormatter } from '../config/common';
const BASE_URL = environment.baseUrl;

/**
 * Endpoints for the API.
 */
/* istanbul ignore next */
const API_ENDPOINTS: any = {
  languages: (entity: string) =>
    `${BASE_URL}/dashboard/ci-theme-language/${entity}/`,
  themes: (entity: string, batch: string) =>
    `${BASE_URL}/dashboard/public/theme/${entity}/?batch=${batch}`,
  storyTelling: (id: string, path: string, theme: string) =>
    `${BASE_URL}/products/${path}/${id}/trace/?theme=${theme}`,
  storyTellingTransactions: (id: string, actorId: string, theme: string) =>
    `${BASE_URL}/products/transaction/${id}/trace/?actor=${actorId}&theme=${theme}`,
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * constructor
   * @param http HttpClient
   */
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private token: TokenService
  ) {}

  /**
   * Retrieve languages for a specific entity.
   * @param entity The entity for which languages are to be retrieved.
   * @param otp The OTP (One-Time Password) for authentication.
   * @returns An observable with the response data.
   */
  getLanguages(entity: any): Observable<any> {
    const url = API_ENDPOINTS.languages(entity);
    return this.http
      .get(url, this.headerOptions(this.token.generateToken()))
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieve theme config for a specific entity and batch
   * @param entity string
   * @param batch string
   * @param otp any
   * @returns Observable<any>
   */
  /* istanbul ignore next */
  getThemes(entity: any, batch: any): Observable<any> {
    const url = API_ENDPOINTS.themes(entity, batch);
    return this.http
      .get(
        url,
        this.headerOptions(
          this.token.generateToken(),
          this.storage.fetchLanguageId()
        )
      )
      .pipe(map(apiFormatter));
  }

  /**
   * Downloads a file from the specified URL.
   *
   * @param url The URL of the file to download.
   * @returns An observable that emits the file data as a Blob when the HTTP request is successful.
   */
  /* istanbul ignore next */
  downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
   * New api - story telling.
   * Get trace batch single, large api is split into multiple apis
   */
 /* istanbul ignore next */
  storyTelling(id: string, path: string, theme: string): Observable<any> {
    const URL = API_ENDPOINTS.storyTelling(id, path, theme);
    return this.http
      .get(
        URL,
        this.headerOptions(
          this.token.generateToken(),
          this.storage.fetchLanguageId()
        )
      )
      .pipe(map(apiFormatter));
  }

  /**
   * Fetches storytelling transactions for a specific item and actor.
   *
   * @param id The identifier of the item for which transactions are fetched.
   * @param actorId The identifier of the actor for whom transactions are fetched.
   * @param theme The theme to apply for fetching transactions.
   * @param otp The OTP (One-Time Password) for authentication.
   * @returns An observable that emits the fetched storytelling transactions data.
   */
   /* istanbul ignore next */
  storyTellingTransactions(
    id: any,
    actorId: any,
    theme: string
  ): Observable<any> {
    // Construct the URL for fetching storytelling transactions
    const URL = API_ENDPOINTS.storyTellingTransactions(id, actorId, theme);

    // Make an HTTP GET request to the constructed URL with appropriate headers
    return this.http.get(
      URL,
      this.headerOptions(
        this.token.generateToken(),
        this.storage.fetchLanguageId()
      )
    ).pipe(map(apiFormatter));
  }

  /**
   * http header Options
   * @param otp
   * @param languageId
   * @returns Observable<any>
   */
   /* istanbul ignore next */
  headerOptions(otp: any, languageId?: any): any {
    const common: any = {
      'Content-Type': 'application/json',
      otp,
    };
    if (languageId) {
      common['Accept-Language'] = languageId;
    } else {
      common['Accept-Language'] = 'en';
    }
    const httpOptions = {
      headers: new HttpHeaders(common),
    };
    return httpOptions;
  }

  /**
   * Error handling
   * @param error any
   */
   /* istanbul ignore next */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
