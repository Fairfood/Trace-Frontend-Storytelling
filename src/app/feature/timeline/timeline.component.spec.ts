import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimelineComponent } from './timeline.component';

const timeLineData: any = [
  {
    title: 'Farmer',
    actor_name: 'A Farmer 1',
    image:
      'https://fairtrace-v2-demo.s3.amazonaws.com/media/operation/1/2hjLDuqLQHFarmer_group.png',
    description: '',
    stage_products: [
      {
        id: 'BR8ml',
        name: 'Yellow Apple1',
        description: 'hjfdshj',
        location: '',
        image: '',
        incoming: false,
        outgoing: true,
        processed: false,
      },
    ],
    actors: [
      {
        id: 'EDrXz',
        name: 'A Farmer 1',
        short_name: 'A Farmer 1',
        blockchain_address: '',
        primary_operation: {
          id: 'mB6GE',
          name: 'Farmer',
        },
        type: 2,
        status: 2,
        image: '',
        latitude: 42.208,
        longitude: -77.45118,
        country: 'Cameroon',
        province: 'North-West (Cameroon)',
        description_basic: 'Meet A Farmer 1, a farmer and from Cameroon',
        date_joined: null,
        managers: ['ZWoYW'],
        claims: [],
        transaction_count: 2,
        transaction_quantity: 115,
        transactions: [
          {
            date: 1664776225,
            transaction_type: 1,
            logged_time: 1664862625.935153,
            source_quantity: 45,
            destination_quantity: 45,
            product: {
              name: 'Yellow Apple1',
            },
            claims: [],
            source_id: 4044,
            source_wallet: {
              id: 5304,
              account_id: '',
              public: '',
              wallet_type: 201,
              explorer_url: 'https://explorer.kabuto.sh/testnet/id/',
            },
            destination_id: 2371,
            destination_wallet: {
              id: 4552,
              account_id: '',
              public: '',
              wallet_type: 201,
              explorer_url: 'https://explorer.kabuto.sh/testnet/id/',
            },
            wallet_type: 201,
            blockchain_address: '',
            explorer_url: 'https://explorer.kabuto.sh/testnet/transaction/',
            info_message_address: '',
            info_explorer_url: '',
            source: {
              id: 'EDrXz',
              name: 'A Farmer 1',
              blockchain_address: '',
              latlong: {
                id: 'EDrXz',
                latitude: 42.208,
                longitude: -77.45118,
              },
            },
            destination: {
              id: 'ZWoYW',
              name: 'B Company',
              blockchain_address: null,
              latlong: {
                id: 'ZWoYW',
                latitude: 36.758126,
                longitude: 66.898083,
              },
            },
            title: 'Outgoing to B Company',
            direction: 1,
          },
        ],
        connected_to: [
          {
            id: 'ZWoYW',
            latitude: 36.758126,
            longitude: 66.898083,
          },
        ],
        products: [
          {
            id: 'BR8ml',
            name: 'Yellow Apple1',
            description: 'hjfdshj',
            location: '',
            image: '',
            incoming: false,
            outgoing: true,
            processed: false,
            type: 'Outgoing',
          },
        ],
      },
    ],
    date: '03 October 2022',
  },
];

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  beforeEach(async () => {
    const translateServiceSpyObj = jasmine.createSpyObj('TranslateService', [
      'get',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        TimelineComponent,
        MatTooltipModule,
        CommonModule,
        TranslateModule,
        MatDialogModule,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    component.timelineData = timeLineData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activeItem to 0 on ngOnInit', () => {
    component.ngOnInit();
    expect(component.activeItem).toEqual(0);
  });

  it('Active index should be initialised zero. When it should updated when clicking on the next/previous', () => {
    expect(component.activeItem).toEqual(0);
    component.itemSelected(1);
    expect(component.activeItem).toEqual(1);
    component.itemSelected(2);
    expect(component.activeItem).toEqual(2);
  });

  it('should return the index as the tracking identifier', () => {
    const item = { id: 1, name: 'Item 1' };
    const index = 0;
    const result = component.trackByFn(item, index);
    expect(result).toBe(index);
  });

  it('should set activeItem and emit itemClicked event', () => {
    const index = 1;

    // Call the method
    component.itemSelected(index);

    // Check if activeItem is set correctly
    expect(component.activeItem).toEqual(index);

    // Check if itemClicked event is emitted with the expected data and index
    component.itemClicked.subscribe(event => {
      expect(event.data).toEqual(component.timelineData[index]);
      expect(event.index).toEqual(index);
    });
  });
});
