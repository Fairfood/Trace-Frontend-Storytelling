import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CHAR_LIMIT, TrimFieldName } from 'src/app/shared/config';
import { IComponentData } from 'src/app/shared/components/list-with-image/list-with-image.component';

/**
 * Service for the Claim Details page.
 * Contains methods for getting and formatting data for the page.
 * Contains the business logic for the page.
 */
@Injectable({
  providedIn: 'root',
})
export class ClaimDetailsService {
  constructor(private sanitize: DomSanitizer) {}

  getInterventionData(data: any): IComponentData[] {
    // Initialize interventions with a default value if it's not defined
    const interventions: IComponentData[] =
      data?.interventions?.map((intervention: any) => {
        const { name, description, image_url, external_link, id } =
          intervention;
        return {
          id,
          title: TrimFieldName(CHAR_LIMIT.interventionName, name),
          description: TrimFieldName(CHAR_LIMIT.interventionDesc, description),
          imageUrl:
            image_url || '../../../assets/images/banner_placeholder.jpg',
          readMoreUrl: external_link,
        };
      }) || [];

    return interventions;
  }

  /**
   * Opens a file viewer dialog for the given fileObject.
   * Determines the type of file and sets appropriate properties for viewing.
   */
  configureFileObject(fileObject: any): any {
    const fileExtension = (fileObject?.file?.split('/').pop()?.split('.').pop()) || '';


    // Check if the file is a PDF
    const isPdf = fileExtension === 'pdf';

    // Check if the file type is in the list of OneDrive-supported types
    const isOneDriveType = [
      'ppt',
      'pptx',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'txt',
    ].includes(fileExtension);

    if (isPdf) {
      // Configure for PDF viewing
      fileObject.viewer = 'pdfviewer';
      fileObject.url = this.sanitize.bypassSecurityTrustResourceUrl(
        `https://docs.google.com/viewer?url=${fileObject.file}&embedded=true`
      );
      fileObject.fileUrl = this.sanitize.bypassSecurityTrustResourceUrl(
        fileObject.file
      );
    } else if (isOneDriveType) {
      // Configure for OneDrive viewing
      fileObject.viewer = 'onedrive';
      fileObject.url = this.sanitize.bypassSecurityTrustResourceUrl(
        `https://view.officeapps.live.com/op/embed.aspx?src=${fileObject.file}`
      );
    } else {
      // Default to image viewer
      fileObject.viewer = 'image';
      fileObject.url = fileObject.file;
    }

    return fileObject;
  }
}
