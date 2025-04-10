import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss'],
})
export class ClaimListComponent {
  @Input() batchClaims: any[];
  @Input() primaryClaimIndex: any;
  @Output() claimClicked = new EventEmitter<any>();

  /**
   * Claim clicked
   * To parent. Action handled in parent
   * @param data any
   */
  claimDetails(data: any): void {
    this.claimClicked.emit(data);
  }

  /**
   * Handle image loading errors by setting a default image
   * @param event
   */
  onImgError(event: any): void {
    event.target.src = '../../assets/images/default_claim_error.png';
  }
}
