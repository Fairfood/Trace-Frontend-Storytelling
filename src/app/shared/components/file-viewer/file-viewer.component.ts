import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatDialogModule, TranslateModule],
})
export class FileViewerComponent implements OnInit {
  viewer = 'none';
  loader = false;
  constructor(
    public dialogRef: MatDialogRef<FileViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.viewer = this.data.viewer;
    if (this.viewer === 'pdfviewer') {
      this.loader = true;
    }
  }
  pdfLoaded(): void {
    this.loader = false;
  }
}
