import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailComponent } from './transaction-detail.component';
import { ApiService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCarousalComponent } from 'src/app/shared/components/image-carousal';
import { BlockchainDetailsComponent } from 'src/app/shared/components/blockchain-details';
import { PlaceholderLoaderComponent } from 'src/app/shared/components/placeholder-loader';
import { TruncateTextPipe } from 'src/app/shared/pipes';
import { of } from 'rxjs';

describe('TransactionDetailComponent', () => {
  let component: TransactionDetailComponent;
  let fixture: ComponentFixture<TransactionDetailComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockStoryService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockStoryService = jasmine.createSpyObj('ApiService', [
      'storyTellingTransactions',
    ]);

    TestBed.configureTestingModule({
      imports: [
        TransactionDetailComponent,
        CommonModule,
        TranslateModule,
        ImageCarousalComponent,
        BlockchainDetailsComponent,
        PlaceholderLoaderComponent,
        TruncateTextPipe,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: ApiService, useValue: mockStoryService },
      ],
    });

    fixture = TestBed.createComponent(TransactionDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle image error', () => {
    const fakeEvent = { target: { src: '' } };
    component.onImgError(fakeEvent);
    expect(fakeEvent.target.src).toContain('product_placeholder.png');
  });

  it('should set loading to false if transaction data is available', () => {
    // Mock data
    component.selectedFarmer = {
      transactionData: ['transaction1', 'transaction2'],
      count: 2,
    };
    const actorId = '123';

    // Call the method
    component.fetchTransactionDetails(actorId);

    // Expectations
    expect(component.loading).toBe(false);
    expect(mockStoryService.storyTellingTransactions).not.toHaveBeenCalled();
  });

  it('should fetch transaction data and update selectedFarmer if data is not available', () => {
    // Mock data
    component.selectedFarmer = { transactionData: null, count: 0 };
    const actorId = '123';
    const apiResponse = {
      count: 2,
      transactions: ['transaction1', 'transaction2'],
    };

    // Mock the API call
    mockStoryService.storyTellingTransactions.and.returnValue(of(apiResponse));

    // Call the method
    component.fetchTransactionDetails(actorId);

    // Expectations
    expect(mockStoryService.storyTellingTransactions).toHaveBeenCalledWith(
      component.batchId,
      actorId,
      component.theme
    );
    expect(component.selectedFarmer.transactionData).toEqual(
      apiResponse.transactions
    );
    expect(component.selectedFarmer.count).toBe(apiResponse.count);
    expect(component.loading).toBe(false);
  });

  it('should update selectedFarmer and fetch transaction details when transactionData changes', () => {
    const mockTransactionDataChanges: any = {
      transactionData: {
        currentValue: {
          actors: [{ id: '123' }],
        },
      },
    };

    spyOn(component, 'fetchTransactionDetails');

    component.ngOnChanges(mockTransactionDataChanges);

    expect(component.selectedFarmer).toEqual(
      mockTransactionDataChanges.transactionData.currentValue.actors[0]
    );
    expect(component.loading).toBe(true);
    expect(component.fetchTransactionDetails).toHaveBeenCalledWith('123');
  });

  it('should change the selected farmer and fetch transaction details', () => {
    const mockIndex = 1;
    const mockSelectedFarmer: any = {
      id: '123',
      products: [{ name: 'Product 1' }, { name: 'Product 2' }],
    };

    component.transactionData = {
      actors: [
        {
          id: '111',
          products: [{ name: 'Product 1' }, { name: 'Product 2' }],
        },
        mockSelectedFarmer,
      ],
    };
    component.isMobile = true;

    spyOn(component, 'fetchTransactionDetails');
    spyOn(component, 'setProductSlider');

    component.changeFarmer(mockIndex);

    expect(component.selectedFarmer).toEqual(mockSelectedFarmer);
    expect(component.loading).toBe(true);
    expect(component.fetchTransactionDetails).toHaveBeenCalledWith(
      mockSelectedFarmer.id
    );
    expect(component.setProductSlider).toHaveBeenCalledWith(
      mockSelectedFarmer.products
    );
  });

  it('should set up product slider data', () => {
    const mockProductData = [
      {
        name: 'Product 1',
        theme_description: 'Description 1',
        image_url: 'image1.jpg',
      },
      { name: 'Product 2', theme_description: 'Description 2' },
    ];

    component.setProductSlider(mockProductData);

    expect(component.productSlider.length).toBe(mockProductData.length);

    // Check the first product
    expect(component.productSlider[0].title).toBe('Product 1');
    expect(component.productSlider[0].subTitle).toBe('Description 1');
    expect(component.productSlider[0].imageUrl).toBe('image1.jpg');
    expect(component.productSlider[0].description).toBe('Description 1');

    // Check the second product
    expect(component.productSlider[1].title).toBe('Product 2');
    expect(component.productSlider[1].subTitle).toBe('Description 2');
    expect(component.productSlider[1].imageUrl).toBe(
      '../../assets/images/product_placeholder.png'
    );
    expect(component.productSlider[1].description).toBe('Description 2');
  });
});
