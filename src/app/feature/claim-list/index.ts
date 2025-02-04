export { ClaimListComponent } from './claim-list.component';
/*
# ClaimListComponent Documentation

## Overview
The `ClaimListComponent` is a reusable Angular component responsible for displaying a list of claims.
 It is used to show a list of batch claims, with one primary claim and additional claims that can be accessed through a dropdown menu.
  When a claim is clicked, an event is emitted to notify the parent component.

## Usage
To use the `ClaimListComponent` in your Angular application, you should follow these steps:

1. Import the necessary modules:
   - CommonModule from `@angular/common`
   - MatMenuModule from `@angular/material/menu`

2. Include the `ClaimListComponent` selector (`<app-claim-list></app-claim-list>`) 
in your HTML template where you want to display the list of claims.

3. Provide the required input properties:
   - `batchClaims`: An array of claim data that includes both the primary claim and additional claims.
   - `primaryClaimIndex`: The index of the primary claim within the `batchClaims` array.

4. Listen for the `claimClicked` event by binding to it in your parent component. 
When a claim is clicked, this event will be emitted with the clicked claim's data.

## Component Properties
- `batchClaims`: An input property that accepts an array of claim data, including both the primary claim and additional claims.
- `primaryClaimIndex`: An input property that specifies the index of the primary claim within the `batchClaims` array.
- `claimClicked`: An output property that emits an event when a claim is clicked. The event contains the clicked claim's data.

## Methods
- `claimDetails(data: any)`: A method that emits the `claimClicked` event when a claim is clicked. 
It takes the clicked claim's data as an argument.

## Example
```html
<app-claim-list
  [batchClaims]="batchClaimsArray"
  [primaryClaimIndex]="0"
  (claimClicked)="onClaimClicked($event)"
></app-claim-list>

*/
