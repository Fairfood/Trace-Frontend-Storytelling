import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
// services
import { ApiService, LanguageService } from '.';
// configs and constants
import {
  CHAR_LIMIT,
  isMobile,
  PROGRAM_SAMPLE,
  sortByKey,
  TrimFieldName,
} from '../config';
import { ApiResponse, NodeInfo } from '../../feature/story/story.interface';
import { Language } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  /**
   * Getting the actor data for showing in the google map ( Connections )
   * @param theme string
   * @param id string
   * @returns Observable response
   */
  fetchingMapData(theme: string, id: string): Observable<any> {
    return this.apiService.storyTelling(id, 'map', theme).pipe(
      map(result => {
        const { program, map } = result;
        let programSection: any = {};
        if (Object.keys(program)?.length) {
          program.tittle = TrimFieldName(
            CHAR_LIMIT.projectTitle,
            program.tittle
          );
          program.description = TrimFieldName(
            CHAR_LIMIT.projectDesc,
            program.description
          );
          programSection = program;
        } else {
          programSection = PROGRAM_SAMPLE;
        }
        return { map, program: programSection };
      })
    );
  }

  /**
   * Various claims attached to the product and the transaction data is fetched
   * @param theme string (theme)
   * @param id string (id)
   * @returns
   */
  fetchingClaims(theme: string, id: string): Observable<any> {
    return this.apiService.storyTelling(id, 'claim', theme).pipe(
      map((claimData: any[]) => {
        let batchClaims: any[] = [];
        const companyClaims: any[] = [];

        claimData.forEach(item => {
          if (item?.type !== 'COMPANY_CLAIM') {
            batchClaims.push(item);
          } else {
            companyClaims.push(item);
          }
        });

        batchClaims =
          batchClaims?.map((item: any) => {
            item.name = TrimFieldName(CHAR_LIMIT.claimName, item?.name || '');
            item.description_full = TrimFieldName(
              CHAR_LIMIT.claimDesc,
              item.description_full
            );
            const hasType: boolean = item.type;
            item.type = hasType ? item.type : 'BATCH_CLAIM';
            return item;
          }) || [];
        const index = batchClaims.findIndex((c: any) => c.primary_claim);
        if (index > -1) {
          const sortedArray = sortByKey(batchClaims, 'primary_claim', 'desc');
          batchClaims = sortedArray;
        }

        return { batchClaims, companyClaims };
      })
    );
  }

  getActorNames(actors: any[]): string[] {
    if (!actors || actors?.length === 0) {
      return [];
    }

    if (actors?.length <= 5) {
      return actors.map(actor => actor.name);
    }

    const selectedActors = actors.slice(0, 4).map(actor => actor.name);
    selectedActors.push(' and more');
    return selectedActors;
  }

  /**
   * Various stages in the trace of the product. Fetching the stages and product details along with actors
   * @param theme string
   * @param id string
   * @returns Observable
   */
  fetchStageDetails(theme: string, id: string): Observable<any> {
    return this.apiService.storyTelling(id, 'stage', theme).pipe(
      map(stages => {
        return stages.map((stage: any) => {
          const { actors } = stage;
          const actorNames = this.getActorNames(actors);

          return {
            ...this.otherResourceDescription(stage.external_sources || []),
            ...stage,
            actorNames,
          };
        });
      })
    );
  }

  /**
   * Performs an action by tracking an event using Google Analytics (if available) and opening a new window with the specified URL.
   * @param url The URL to be opened in a new window.
   */
  getActionLink(url: any): void {
    if ((window as any).ga && (window as any).ga.getAll) {
      (<any>window).ga(
        'send',
        'event',
        'Order coffee',
        'User have clicked order coffee',
        {
          hitCallback: function () {
            console.log('Tracking is successful');
          },
        }
      );
    }

    window.open(url, '_blank');
  }

  /**
   * To identify user is from mobile or not
   * @returns any
   */
  userFromMobile(): any {
    return isMobile.any();
  }

  /**
   * Retrieves available languages for a specific theme from the API.
   * @param theme The theme for which to retrieve available languages.
   * @returns An observable containing the available languages information.
   */
  getAvailableLanguagesForTheme(theme: string): Observable<any> {
    return this.apiService.getLanguages(theme).pipe(
      map(({ data, code, success }: ApiResponse) => {
        if (code !== 200 || !success) {
          return { data, code, success };
        }

        const { available_languages, default_language } = data;
        const available = available_languages.split(',');
        const { browserLanguage, list } =
          this.languageService.availableLanguageDropdowns();
        const dropdownItems = list.filter(({ code }: Language) =>
          available.includes(code)
        );
        const selectingLanguage = available.includes(browserLanguage)
          ? browserLanguage
          : default_language;

        this.languageService.languageSettings(
          selectingLanguage,
          dropdownItems,
          theme
        );

        return data;
      })
    );
  }

  /**
   * Generates a description and count of "other" resources.
   * @param other An array of NodeInfo objects representing other resources.
   * @returns An object containing the generated description and count of "other" resources.
   */

  otherResourceDescription(other: NodeInfo[]): any {
    const result: string[] = [];
    let otherCount = 0;
    if (other?.length) {
      for (const obj of other) {
        const { node_name, external_sources } = obj;
        let sourcesStr = '';
        if (external_sources.length === 2) {
          sourcesStr = `${external_sources[0]} ${this.translate.instant('and')} ${external_sources[1]}`
        } else {
          sourcesStr = external_sources?.join(', ');
        }
        
        otherCount += external_sources?.length;
        result.push(
          `${node_name} ${this.translate.instant(
            'stockFromText'
          )} ${sourcesStr}.`
        );
      }
    }

    return {
      otherDescription: result.join(' '),
      otherCount,
    };
  }

  /**
   * This function maps theme data properties to specific share data properties.
   * @param themeData The theme data containing share-related properties.
   * @returns An object containing mapped share data properties.
   */
  shareDataSpecification(themeData: any): any {
    const {
      share_facebook_title,
      share_linkedin_title,
      share_facebook_body,
      share_linkedin_body,
      share_whatsapp_title,
      share_whatsapp_body,
      share_twitter_title,
      share_twitter_body,
    } = themeData;

    return {
      url: encodeURIComponent(window.location.href),
      title: share_facebook_title,
      description: share_facebook_body,
      title_linkdin: share_linkedin_title,
      description_linkdin: share_linkedin_body,
      title_whatsapp: share_whatsapp_title,
      description_whatsapp: share_whatsapp_body,
      title_twitter: share_twitter_title,
      description_twitter: share_twitter_body,
      redirect_url: window.location.href,
    };
  }

  /**
   * This function generates default placeholder images and returns them along with the image fields.
   * @returns An object containing default images and image fields.
   */
  placeholderImages(): any {
    const imageFields = [
      'actor_placeholder',
      'product_placeholder',
      'farmer_placeholder',
    ];
    const defaultImages: any = {
      [imageFields[0]]: '../../assets/images/actor_placeholder.svg',
      [imageFields[1]]: '../../assets/images/product_placeholder.png',
      [imageFields[2]]: '../../assets/images/farmers_placeholder.svg',
    };
    return { defaultImages, imageFields };
  }
}
