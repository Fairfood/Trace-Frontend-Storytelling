/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// config and data
import { ICommonObject } from '../story/story.interface';
// components
import { TransactionDetailComponent } from '../transaction-detail';
import { ClaimDetailsComponent } from '../claim-details';
import { StoryStoreService } from 'src/app/shared/store';

@Component({
  selector: 'app-mobile-dialog-wrapper',
  templateUrl: './mobile-dialog-wrapper.component.html',
  styleUrls: ['./mobile-dialog-wrapper.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TransactionDetailComponent,
    ClaimDetailsComponent,
  ],
})
export class MobileDialogWrapperComponent implements OnDestroy {
  companyClaims: any[] = [];
  sub: Subscription;
  constructor(
    public dialogRef: MatDialogRef<MobileDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private store: StoryStoreService
  ) {
    this.sub = this.store.companyClaimsData$.subscribe((res: any) => {
      this.companyClaims = res;
    });
  }

  /* istanbul ignore next */
  companyClaim({ id }: ICommonObject): void {
    const claimDetails = this.companyClaims.find((a: any) => a.claim_id === id);
    if (claimDetails) {
      this.claimDetails(claimDetails);
    }
  }

  /* istanbul ignore next */
  claimDetails(data: any): void {
    this.dialog.open(ClaimDetailsComponent, {
      width: '98vw',
      maxWidth: '100vw',
      maxHeight: '95vh',
      data: {
        ...data,
        logo: this.data.brand_logo || '../../assets/images/logo_fairfood.svg',
        banner: this.data?.banner_image,
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
