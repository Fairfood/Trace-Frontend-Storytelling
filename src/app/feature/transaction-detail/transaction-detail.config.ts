/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { BlockchainDetailsComponent } from 'src/app/shared/components/blockchain-details';
import { ImageCarousalComponent } from 'src/app/shared/components/image-carousal';
import { PlaceholderLoaderComponent } from 'src/app/shared/components/placeholder-loader';
import { TruncateTextPipe } from 'src/app/shared/pipes';

export const IMPORTS = [
  CommonModule,
  TranslateModule,
  ImageCarousalComponent,
  BlockchainDetailsComponent,
  PlaceholderLoaderComponent,
  TruncateTextPipe,
  MatDialogModule,
];
