/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { TransactionDetailComponent } from '../transaction-detail';

@Component({
  selector: 'app-mobile-dialog-wrapper',
  templateUrl: './mobile-dialog-wrapper.component.html',
  styleUrls: ['./mobile-dialog-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, TransactionDetailComponent],
})
export class MobileDialogWrapperComponent {
  constructor(
    public dialogRef: MatDialogRef<MobileDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
