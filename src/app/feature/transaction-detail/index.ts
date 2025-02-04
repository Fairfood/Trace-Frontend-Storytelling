export { TransactionDetailComponent } from './transaction-detail.component';
/**
 * # Transaction Detail Component

This Angular component is responsible for displaying transaction details, including a product slider and transaction information. 
It utilizes Angular Material for dialogs and handles the display of images and other data.

## Properties

### Inputs

1. `transactionData` (any): The transaction data to be displayed.
2. `imagesUrl` (any): The URL of the images.
3. `isMobile` (boolean, optional): Indicates if the view is on a mobile device.
4. `batchId` (string): The ID of the batch.
5. `theme` (string): The theme for the transaction.

### Internal Properties

1. `selectedFarmer`: Stores the selected farmer data.
2. `productSlider`: An array of `ProductSliderItem` objects for the product slider.
3. `apiSub`: Subscription for the API requests.
4. `loading`: Indicates if data is still loading.

## Methods

1. `ngOnInit()`: Initializes the component and sets up the product slider for mobile.
2. `ngOnChanges(changes: SimpleChanges)`: Handles input changes, updating the selected farmer and fetching transaction details.
3. `fetchTransactionDetails(actorId: string)`: Fetches transaction details from the API.
4. `changeFarmer(index: number)`: Changes the currently selected farmer.
5. `setProductSlider(productData: any[])`: Sets up the product slider data.
6. `openDialog(data: any)`: Opens a dialog to display blockchain details.
7. `onImgError(event: any)`: Handles image loading errors by setting a default image.
8. `ngOnDestroy()`: Cleans up resources and unsubscribes from the API subscription.

## Usage

```html
<app-transaction-detail
  [transactionData]="transactionData"
  [imagesUrl]="imagesUrl"
  [isMobile]="isMobile"
  [batchId]="batchId"
  [theme]="theme">
</app-transaction-detail>
```

## Example

```typescript
const transactionData = {...};  // Sample transaction data
const imagesUrl = '...';  // Sample image URL
const isMobile = true;
const batchId = '123456';
const theme = 'light';

// Use the component in a template
<app-transaction-detail
  [transactionData]="transactionData"
  [imagesUrl]="imagesUrl"
  [isMobile]="isMobile"
  [batchId]="batchId"
  [theme]="theme">
</app-transaction-detail>
```

This documentation provides an overview of the component's properties and methods, along with usage examples. 
 * 
 */
