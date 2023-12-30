/* istanbul ignore file */
import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
/**
 * Import material modules
 */
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
/**
 * Import pipes
 */
import { TruncateTextPipe, LocalizedDatePipe } from '../../pipes';
@Component({
  selector: 'app-blockchain-details',
  templateUrl: './blockchain-details.component.html',
  styleUrls: ['./blockchain-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    TranslateModule,
    LocalizedDatePipe,
    TruncateTextPipe,
  ],
})
export class BlockchainDetailsComponent implements OnInit {
  @Input() componentData: any;
  @Input() notPopup: boolean;
  hashList = [false, false, false, false];
  data: any;
  constructor(
    public dialogRef: MatDialogRef<BlockchainDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public popupData: any
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    if (!this.notPopup) {
      this.data = this.popupData;
    } else {
      this.data = this.componentData;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  copyHash(val: any) {
    this.hashList[val] = true;
    setTimeout(() => {
      this.hashList[val] = false;
    }, 2000);
  }
}
