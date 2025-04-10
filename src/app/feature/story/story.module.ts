/* istanbul ignore file */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

// material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

// components
import { StoryComponent } from './story.component';
import { GoogleMapComponent } from './google-map.component';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// standalone components
import { PlaceholderLoaderComponent } from '../../shared/components/placeholder-loader';
import { MobileDialogWrapperComponent } from 'src/app/feature/mobile-dialog-wrapper';
import { TransactionDetailComponent } from 'src/app/feature/transaction-detail';
import { ClaimDetailsComponent } from '../claim-details';
import { ClaimListComponent } from '../claim-list';
import { TimelineComponent } from '../timeline/timeline.component';
import { VideoContentComponent } from '../video-content/';
import { ShareButtonComponent } from '../../shared/components/share-button';
import { ImageCarousalComponent } from '../../shared/components/image-carousal/';
import { ProgramSymbolPipe } from 'src/app/shared/pipes';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { InvalidLinkComponent } from 'src/app/shared/components/invalid-link';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

const routes: Routes = [{ path: '', component: StoryComponent }];

@NgModule({
  declarations: [StoryComponent, GoogleMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTooltipModule,
    MatMenuModule,
    TimelineComponent,
    ShareButtonComponent,
    ImageCarousalComponent,
    VideoContentComponent,
    PlaceholderLoaderComponent,
    MobileDialogWrapperComponent,
    TransactionDetailComponent,
    ClaimDetailsComponent,
    ClaimListComponent,
    ProgramSymbolPipe,
    FooterComponent,
    HeaderComponent,
    InvalidLinkComponent
  ],
})
export class StoryModule {}
