import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
// components
import { BlockchainDetailsComponent } from 'src/app/shared/components/blockchain-details';
import { FileViewerComponent } from '../../shared/components/file-viewer';
import {
  IComponentData,
  ListWithImageComponent,
} from 'src/app/shared/components/list-with-image/list-with-image.component';
// services and helpers
import { StoryService } from '../../shared/services/story.service';
import { ClaimDetailsService } from './claim-details.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    BlockchainDetailsComponent,
    ListWithImageComponent,
  ],
})
export class ClaimDetailsComponent implements OnInit, AfterViewInit {
  isMobile = this.storyService.userFromMobile();
  interventions: IComponentData[] = [];

  constructor(
    private dialogRef: MatDialogRef<ClaimDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private storyService: StoryService,
    private service: ClaimDetailsService
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.filterFields();
    this.interventions = this.service.getInterventionData(this.data);
  }

  /**
   * Scrolls to the top of the page after the view has been initialized.
   */
  /* istanbul ignore next */
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('modalHeader').scrollIntoView({
        behavior: 'smooth',
      });
    }, 1000);
  }

  /**
   * Filters the data into 'files' and 'fields' arrays based on the 'type' property.
   * Updates each 'element' object with filtered arrays.
   * Initializes 'interventions' with a default value if it's not defined.
   */
  filterFields(): void {
    // Loop through each 'element' in 'data.evidences'
    this.data?.evidences?.forEach((element: any) => {
      const { data } = element;
      const { files, fields } = data.reduce(
        // Use 'reduce' to filter 'item's into 'files' and 'fields'
        (acc: any, item: any) => {
          if (item.type === 3) {
            acc.files?.push(item);
          } else {
            acc.fields?.push(item);
          }
          return acc;
        },
        { files: [], fields: [] } // Initial accumulator with empty arrays
      );

      // Update the 'element' object with filtered 'files' and 'fields'
      element.files = files;
      element.fields = fields;
    });
  }

  /**
   * Opens a file viewer dialog for the given fileObject.
   * Determines the type of file and sets appropriate properties for viewing.
   * @param fileObject The object representing the file to be viewed.
   */
  viewFile(fileObject: any): void {
    const newFileObject = this.service.configureFileObject(fileObject);

    this.openFileViewerDialog(newFileObject);
  }

  /**
   * Opens the file viewer dialog with the given fileObject data.
   * @param fileObject The object representing the file to be viewed.
   */
  /* istanbul ignore next */
  openFileViewerDialog(fileObject: any): void {
    this.dialog.open(FileViewerComponent, {
      maxWidth: '98vw',
      width: this.isMobile ? '95vw' : '80vw',
      height: '83vh',
      data: fileObject,
    });
  }

  /**
   * Closes the current dialog.
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Closes the current dialog and triggers navigation to the map section.
   */
  goToMapSection(): void {
    this.dialogRef.close({ navigateToMap: true });
  }
}
