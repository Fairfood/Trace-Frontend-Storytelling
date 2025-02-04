export { ClaimDetailsComponent } from './claim-details.component';

/*
# ClaimDetailsComponent Documentation

## Overview
The `ClaimDetailsComponent` is an Angular component responsible for displaying details of a claim. 
It is typically used within a dialog box to show evidence details, including files and fields associated with the claim. 
The component also provides functionality to view files within the dialog, and optionally navigate to a map section.

## Usage
To use the `ClaimDetailsComponent` in your Angular application, you should follow these steps:

1. Import the necessary modules:
   - CommonModule from `@angular/common`
   - TranslateModule from `@ngx-translate/core`
   - MatDialog, MatDialogRef, MAT_DIALOG_DATA, and MatDialogModule from `@angular/material/dialog`
   - Other custom components like `BlockchainDetailsComponent` and `FileViewerComponent`

2. Include the `ClaimDetailsComponent` selector (`<app-claim-details></app-claim-details>`) 
in your HTML template or within a dialog where you want to display claim details.

3. Provide data to the component through the `data` input property. 
The `data` object should contain information related to the claim and evidence.

4. The component will automatically filter and categorize evidence data into 'files' and 'fields' arrays based on the 'type' property.

5. You can open files for viewing by clicking on them. Supported file types include PDF, Microsoft Office documents, and images.

6. Optionally, you can close the dialog by calling the `close` method. 
If you want to navigate to a map section, call the `goToMapSection` method with `{ navigateToMap: true }`.

## Component Properties
- `data`: An input property that accepts an object containing claim and evidence details.

## Methods
- `filterFields()`: A method that filters and categorizes evidence data into 'files' and 'fields' arrays based on the 'type' property. 
    It also initializes the 'interventions' array with a default value if it's not defined.
- `viewFile(fileObject: any)`: A method that opens a file viewer dialog for the given fileObject. 
    It determines the type of file and sets appropriate properties for viewing.
- `openFileViewerDialog(fileObject: any)`: A method that opens the file viewer dialog with the given fileObject data.
- `close()`: A method that closes the current dialog.
- `goToMapSection()`: A method that closes the current dialog and triggers navigation to the map section.

## Example
```html
<app-claim-details [data]="claimData"></app-claim-details>

*/
