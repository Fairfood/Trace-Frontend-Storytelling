import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ClaimDetailsComponent } from './claim-details.component';
import { ClaimDetailsService } from './claim-details.service';
import { StoryService } from '../../shared/services/story.service';

// Mocking the StoryService
class MockStoryService {
  userFromMobile() {
    return true; // Mocking for mobile
  }
}

// Mocking the ClaimDetailsService
class MockClaimDetailsService {
  getInterventionData(data: any): any {
    return []; // Mocking for intervention data
  }

  configureFileObject(fileObject: any) {
    return {
      viewer: '',
      url: '',
    }; // Mocking for fileObject configuration
  }
}

describe('ClaimDetailsComponent', () => {
  let component: ClaimDetailsComponent;
  let fixture: ComponentFixture<ClaimDetailsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ClaimDetailsComponent>>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ClaimDetailsComponent,
        TranslateModule.forRoot(),
        MatDialogModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatDialog, useValue: mockDialog },
        { provide: StoryService, useClass: MockStoryService },
        { provide: ClaimDetailsService, useClass: MockClaimDetailsService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isMobile', () => {
    expect(component.isMobile).toBe(true);
  });

  it('should call getInterventionData on ngOnInit', () => {
    spyOn(component['service'], 'getInterventionData').and.returnValue([]);
    component.ngOnInit();
    expect(component['service'].getInterventionData).toHaveBeenCalled();
    expect(component.interventions).toEqual([]);
  });

  it('should call filterFields on ngOnInit', () => {
    spyOn(component, 'filterFields');
    component.ngOnInit();
    expect(component.filterFields).toHaveBeenCalled();
  });

  it('should call dialogRef.close on close', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close with navigateToMap: true on goToMapSection', () => {
    component.goToMapSection();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ navigateToMap: true });
  });
});
