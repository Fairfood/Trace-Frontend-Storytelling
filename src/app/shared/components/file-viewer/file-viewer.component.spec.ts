import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileViewerComponent } from './file-viewer.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

describe('FileViewerComponent', () => {
  let component: FileViewerComponent;
  let fixture: ComponentFixture<FileViewerComponent>;
  const matDialogRefMock = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PdfViewerModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        FileViewerComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { viewer: 'pdfviewer' } },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        TranslateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize viewer and loader for PDF', () => {
    expect(component.viewer).toEqual('pdfviewer');
    expect(component.loader).toBeTrue();
  });

  it('should close dialog', () => {
    component.close();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });
});
