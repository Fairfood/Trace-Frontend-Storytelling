import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimListComponent } from './claim-list.component';

describe('ClaimListComponent', () => {
  let component: ClaimListComponent;
  let fixture: ComponentFixture<ClaimListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClaimListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit claim details', () => {
    const testData = { name: 'Test Claim', image_url: 'test_image_url' };
    let emittedData: any;

    component.claimClicked.subscribe(data => {
      emittedData = data;
    });

    component.claimDetails(testData);

    expect(emittedData).toEqual(testData);
  });

});
