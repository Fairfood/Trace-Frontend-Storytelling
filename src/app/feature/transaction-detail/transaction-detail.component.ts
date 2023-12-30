import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
// component
import { BlockchainDetailsComponent } from '../../shared/components/blockchain-details';
// config
import { CHAR_LIMIT, TrimFieldName } from '../../shared/config/common';
import { IMPORTS } from './transaction-detail.config';
// service
import { ApiService } from 'src/app/shared/services';

/**
 * Define an interface for items in the product slider
 */
interface ProductSliderItem {
  title: string;
  subTitle: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: true,
  imports: IMPORTS,
})
export class TransactionDetailComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() transactionData: any;

  @Input() imagesUrl: any;

  @Input() isMobile?: boolean;

  @Input() batchId: string;

  @Input() theme: string;

  @Output() claimClicked = new EventEmitter<any>();

  selectedFarmer: any;
  productSlider: ProductSliderItem[] = [];

  apiSub: Subscription;
  loading = true;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  /**
   * Initialize component
   * 
   */
   /* istanbul ignore next */
  ngOnInit(): void {
    if (this.isMobile) {
      // Initialize product slider for mobile
      this.setProductSlider(this.selectedFarmer.products);
    }
  }

  /**
   * Handle input changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { transactionData } = changes;
    if (transactionData) {
      // Update selectedFarmer and fetch transaction details when transactionData changes
      this.selectedFarmer = transactionData.currentValue.actors[0];
      this.loading = true;
      this.fetchTransactionDetails(this.selectedFarmer.id);
    }
  }

  /**
   * Fetch transaction details from the API
   * @param actorId string
   */
  fetchTransactionDetails(actorId: string): void {
    if (this.selectedFarmer.transactionData) {
      // Check if transaction data is already available
      this.loading = false;
    } else {
      if (this.apiSub) {
        // Unsubscribe from previous API subscription to avoid memory leaks
        this.apiSub.unsubscribe();
      }
      this.apiSub = this.apiService
        .storyTellingTransactions(this.batchId, actorId, this.theme)
        .subscribe(result => {
          const { count, transactions } = result;
          // Update selectedFarmer with fetched data
          this.selectedFarmer.transactionData = transactions;
          this.selectedFarmer.count = count;
          this.loading = false;
        });
    }
  }

  /**
   * Change the currently selected farmer
   * It will call an api to fetch the transaction details for the selected farmer
   * @param index number
   */
  changeFarmer(index: number): void {
    this.selectedFarmer = this.transactionData.actors[index];
    this.loading = true;
    this.fetchTransactionDetails(this.selectedFarmer?.id);
    if (this.isMobile) {
      this.setProductSlider(this.selectedFarmer?.products);
    }
  }

  /**
   * Set up the product slider data
   * @param productData any[]
   */
  setProductSlider(productData: any[]): void {
    this.productSlider = productData.map((p: any) => {
      const { name, theme_description, description, theme_name } = p;
      const productName = theme_name || name;
      const descriptionText = TrimFieldName(
        CHAR_LIMIT.productDesc,
        theme_description || description
      );
      return {
        title: TrimFieldName(CHAR_LIMIT.productName, productName),
        subTitle: descriptionText,
        imageUrl: p.image_url || '../../assets/images/product_placeholder.png',
        description: descriptionText,
      };
    });
  }

   /* istanbul ignore next */
  openDialog(data: any): void {
    this.dialog.open(BlockchainDetailsComponent, {
      width: this.isMobile ? '100vh' : '50vw',
      height: this.isMobile ? '100vh' : 'auto',
      maxWidth: this.isMobile ? '100vw' : '80vw',
      maxHeight: '100vh',
      data,
    });
  }

   /* istanbul ignore next */
  openClaimDialog(data: any): void {
    this.claimClicked.emit(data);
  }

  /**
   * Handle image loading errors by setting a default image
   * @param event
   */
  onImgError(event: any): void {
    event.target.src = '../../assets/images/product_placeholder.png';
  }

  /**
   * Clean up resources and unsubscribe from the API subscription
   */
   /* istanbul ignore next */
  ngOnDestroy(): void {
    this.apiSub?.unsubscribe();
  }
}
