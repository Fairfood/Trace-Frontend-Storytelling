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

describe('ClaimDetailsComponent', () => {
  let component: ClaimDetailsComponent;
  let fixture: ComponentFixture<ClaimDetailsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ClaimDetailsComponent>>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let service: jasmine.SpyObj<ClaimDetailsService>;
  let storyService: jasmine.SpyObj<StoryService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    service = jasmine.createSpyObj('ClaimDetailsService', [
      'getInterventionData',
      'configureFileObject',
    ]);

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
        { provide: ClaimDetailsService, useValue: service },
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
    spyOn(component, 'filterFields');
    service.getInterventionData.and.returnValue([]);
    component.ngOnInit();
    expect(service.getInterventionData).toHaveBeenCalled();
    expect(component.interventions).toEqual([]);
    expect(component.filterFields).toHaveBeenCalled();
  });

  describe('filterFields', () => {
    it('should filter file types', () => {
      component.data = {
        evidences: [
          {
            data: [
              { type: 3, title: 'file1' },
              { type: 2, title: 'normal' },
            ],
          },
        ],
      };
      component.filterFields();
      expect(component.data.evidences[0].files).toEqual([
        { type: 3, title: 'file1' },
      ]);
      expect(component.data.evidences[0].fields).toEqual([
        { type: 2, title: 'normal' },
      ]);
    });
  });

  it('viewFile', () => {
    spyOn(component, 'openFileViewerDialog');
    component.viewFile({});

    expect(component.openFileViewerDialog).toHaveBeenCalled();
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
