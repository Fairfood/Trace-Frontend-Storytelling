import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
/**
 * Services
 */
import {
  ThemeService,
  StoryService,
  SocialShareService,
  StorageService,
  ApiService,
} from 'src/app/shared/services';

/**
 * Components
 */
import { MobileDialogWrapperComponent } from '../mobile-dialog-wrapper/mobile-dialog-wrapper.component';
import { ClaimDetailsComponent } from '../claim-details/claim-details.component';
import { GoogleMapComponent } from './google-map.component';
/**
 * Configs
 */
import { mapStyle } from './map-style';
import { CHAR_LIMIT, TrimFieldName } from '../../shared/config/common';
import { ICommonObject } from './story.interface';
import { StoryStoreService } from 'src/app/shared/store';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent
  extends GoogleMapComponent
  implements OnInit, OnDestroy {
  dataLoading = true;
  pageApis: Subscription[] = [];

  invalidLink: boolean;

  selectedStage: any;
  selectedStageIndex: number;
  imagesUrl: any[];
  sharingData: any;
  programSection: any;
  isMobile = this.storyService.userFromMobile();

  batchClaims: any[] = [];
  companyClaims: any[] = [];
  primaryClaimIndex: any;
  stageLoading = true;
  isFto = false;
  constructor(
    private routes: ActivatedRoute,
    public storyService: StoryService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private socialShareService: SocialShareService,
    private themeService: ThemeService,
    private storage: StorageService,
    private apiService: ApiService,
    private store: StoryStoreService
  ) {
    super();
  }

  ngOnInit(): void {
    const entity = this.routes.snapshot.params['entity'];
    const batch = this.routes.snapshot.queryParams['batch'];
    const batchFromParam = this.routes.snapshot.params['batch'];
    const theme = this.routes.snapshot.queryParams['theme'];
    this.isFto = (batchFromParam ? theme : entity).includes('fto');
    this.initializeData(batchFromParam ? theme : entity, batchFromParam || batch);
    // this.initializeData(entity, batch);
  }

  initializeData(entity: string, batch: string): void {
    if (entity) {
      this.invalidLink = false;
      this.fetchThemeLanguages(entity, batch);
    } else {
      this.stopLoadingAndShowError();
    }
  }

  stopLoadingAndShowError(): void {
    this.invalidLink = true;
    this.dataLoading = false;
  }

  /* istanbul ignore next */
  fetchThemeLanguages(entity: string, batch: string): void {
    const api = this.storyService
      .getAvailableLanguagesForTheme(entity)
      .subscribe({
        next: () => {
          this.getTheme(entity, batch);
          this.loadGoogleMaps(this.storage.fetchLanguageId());
        },
        error: () => {
          this.stopLoadingAndShowError();
        },
      });
    this.pageApis.push(api);
  }

  /* istanbul ignore next */
  private setThemeDataFields() {
    const charLimit = CHAR_LIMIT;
    const {
      action_button_text,
      banner_text,
      video_title,
      video_description,
      video_url,
      banner_image,
      mobile_banner_image,
    } = this.themeData;
    this.themeData.action_button_text = TrimFieldName(
      charLimit.button,
      action_button_text
    );
    this.themeData.banner_text = banner_text
      ? TrimFieldName(charLimit.pageTitle, banner_text)
      : 'Tracable, Fair Price';
    this.themeData.video_title = TrimFieldName(
      charLimit.videoTitle,
      video_title
    );
    this.themeData.video_description = TrimFieldName(
      charLimit.videoDesc,
      video_description
    );
    this.themeData.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(
      video_url ?? 'https://www.youtube.com/embed/YeugwL_DNlY'
    );
    this.themeData.mobile_banner_image = mobile_banner_image || banner_image;

    if (!banner_image) {
      this.themeData.banner_image =
        '../../assets/images/banner_placeholder.jpg';
    }

    this.setDefaultPlaceholderImages();
  }

  /**
   * This method sets default placeholder images for image fields in the theme data if they are not already defined.
   * And calls the next method shareDataSpec
   */
  /* istanbul ignore next */
  private setDefaultPlaceholderImages(): void {
    // Retrieve default images and image fields from the story service
    const { defaultImages, imageFields } =
      this.storyService.placeholderImages();

    // Iterate through the image fields
    for (const field of imageFields) {
      // Set default image for the field if not already defined in theme data
      if (!this.themeData[field]) {
        this.themeData[field] = defaultImages[field];
      }
    }

    this.shareDataSpec();
  }

  /* istanbul ignore next */
  private setMapStyle() {
    const { primary_colour_light, secondary_colour } = this.themeData;
    mapStyle[1].stylers[0]['color'] = primary_colour_light;
    const markers = this.themeService.themeConfiguration(this.themeData);
    this.markerSmall = markers.markerSmallSvg.replace(
      '{{ color }}',
      secondary_colour
    );
    this.markerBig = markers.markerBigSvg.replace(
      '{{ color }}',
      secondary_colour
    );
    mapStyle[1].stylers[0]['color'] = primary_colour_light;
  }

  /**
   * This method prepares and updates share data for social sharing.
   */
  shareDataSpec(): void {
    this.sharingData = this.storyService.shareDataSpecification(this.themeData);
    const {
      share_facebook_title,
      share_linkedin_title,
      share_facebook_body,
      share_linkedin_body,
    } = this.themeData;
    this.socialShareService.updateTitle({
      title: share_facebook_title || share_linkedin_title,
      description: share_facebook_body || share_linkedin_body,
      url: this.sharingData['url'],
    });
    this.store.updateStateProp<any>('themeConfiguration', this.themeData);
    this.store.updateStateProp<any>('sharingData', this.sharingData);
  }

  /**
   * This will fetch all the configuration data for the theme.
   * It needs entity id and batch id to fetch the data.
   * @param entity string
   * @param batch string
   */
  getTheme(entity: string, batch: string): void {
    const api = this.apiService.getThemes(entity, batch ?? '').subscribe({
      next: (result: any) => {
        this.themeData = result;
        this.setThemeDataFields();
        this.setMapStyle();
        this.getClaimDetails(entity, batch);
      },
      error: () => {
        this.stopLoadingAndShowError();
      },
    });
    this.pageApis.push(api);
  }

  getClaimDetails(theme: string, id: string): void {
    const api = this.storyService.fetchingClaims(theme, id).subscribe({
      next: (result: any) => {
        const { batchClaims, companyClaims } = result;

        this.companyClaims = companyClaims;
        this.store.updateStateProp<any[]>('companyClaims', companyClaims);
        this.batchClaims = batchClaims;

        this.primaryClaimIndex = 0;
        this.getActorData(theme, id);
      },
      error: (err: any) => {
        console.log('Error batch details ', err);
        this.invalidLink = true;
        this.dataLoading = false;
      },
    });
    this.pageApis.push(api);
  }

  getActorData(theme: string, id: string): void {
    const api = this.storyService.fetchingMapData(theme, id).subscribe({
      next: (result: any) => {
        const { program, map } = result;
        program.program_stats_details = program.program_stats_details?.map((p: any) => {
          return {
            ...p,
            name: TrimFieldName(CHAR_LIMIT.programTitle, p.name),
          };
        });
        this.programSection = program;
        this.mapActors = map || [];
        this.dataLoading = false;

        this.getStageDetails(theme, id);
      },
      error: () => {
        this.invalidLink = true;
        this.dataLoading = false;
      },
    });
    this.pageApis.push(api);
  }
  /**
   * Fetches stage details and populates the stages, selected stage, and handles loading states.
   * @param theme The theme for the stage details.
   * @param id The ID of the stage.
   */
  getStageDetails(theme: string, id: string): void {
    this.stageLoading = true;
    const api = this.storyService.fetchStageDetails(theme, id).subscribe({
      next: (result: any) => {
        this.stages = result;
        this.selectedStage = result[0];
        this.selectedStageIndex = 0;
        this.setSlider(this.stages[0].actors);
      },
      error: () => {
        this.invalidLink = true;
      },
      complete: () => {
        this.stageLoading = false;
      },
    });
    this.pageApis.push(api);
  }

  /* istanbul ignore next */
  selectStage(stage: any): void {
    const { data, index } = stage;
    this.selectedStage = data;
    this.selectedStageIndex = index;
    if (this.polygonMap) {
      this.polygonMap.setMap(null);
    }
    this.setSlider(this.stages[index].actors);
    this.setMapView(this.stages[index].actors, 'stage');
    if (this.isMobile) {
      this.dialog.open(MobileDialogWrapperComponent, {
        width: '100%',
        height: '94%',
        maxWidth: '100%',
        maxHeight: '100%',
        data: {
          stage: this.selectedStage,
          imageUrl: this.imagesUrl,
          theme: this.themeData.name,
          batch: this.themeData.batch,
          selectedStageIndex: this.selectedStageIndex,
          brand_logo: this.themeData.brand_logo,
          banner_image: this.themeData?.banner_image,
        },
        panelClass: 'mobile-dialog',
        enterAnimationDuration: '600ms',
        delayFocusTrap: true,
      });
    }
  }

  setSlider(farmers: any): void {
    if (farmers?.length > 1) {
      const array = [];
      for (let farmer of farmers) {
        const data: any = {
          title: farmer.name,
          subTitle: `${farmer.province}, ${farmer.country}`,
          imageUrl: farmer.image || this.themeData.farmer_placeholder,
        };
        array.push(data);
      }
      this.imagesUrl = [...array];
    } else {
      this.imagesUrl = [
        {
          imageUrl: farmers[0].image || this.themeData.farmer_placeholder,
          title: farmers[0].name,
          subTitle: `${farmers[0].province}, ${farmers[0].country}`,
        },
      ];
    }
  }

  getLink(): void {
    this.storyService.getActionLink(this.themeData?.action_button_url);
  }

  /* istanbul ignore next */
  claimDetails(data: any): void {
    const dialog = this.dialog.open(ClaimDetailsComponent, {
      width: this.isMobile ? '98vw' : '50vw',
      maxWidth: this.isMobile ? '100vw' : '80vw',
      maxHeight: '95vh',
      data: {
        ...data,
        logo:
          this.themeData.brand_logo || '../../assets/images/logo_fairfood.svg',
        banner: this.themeData?.banner_image,
      },
    });

    dialog.afterClosed().subscribe(result => {
      if (result?.navigateToMap) {
        this.plotPolygon(data.context[0].map_boundary);
      }
    });
  }

  /* istanbul ignore next */
  openCompanyClaim({ id }: ICommonObject): void {
    const claimDetails = this.companyClaims.find((a: any) => a.claim_id === id);
    if (claimDetails) {
      this.claimDetails(claimDetails);
    }
  }

  /* istanbul ignore next */
  ngOnDestroy(): void {
    this.pageApis?.map(m => m?.unsubscribe());
  }
}
