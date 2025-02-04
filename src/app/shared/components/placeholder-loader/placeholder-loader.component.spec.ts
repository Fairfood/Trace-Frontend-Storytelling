import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderLoaderComponent } from './placeholder-loader.component';
import { GenerateArrayFromNumberPipe } from './generate-n.pipe';

describe('PlaceholderLoaderComponent', () => {
  let component: PlaceholderLoaderComponent;
  let fixture: ComponentFixture<PlaceholderLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderLoaderComponent, GenerateArrayFromNumberPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image placeholder if showImagePlaceholder is true', () => {
    component.showImagePlaceholder = true;
    fixture.detectChanges();

    const imageBgLoading =
      fixture.nativeElement.querySelector('.image-bg-loading');
    expect(imageBgLoading).toBeTruthy();
  });

  it('should not display image placeholder if showImagePlaceholder is false', () => {
    component.showImagePlaceholder = false;
    fixture.detectChanges();

    const imageBgLoading =
      fixture.nativeElement.querySelector('.image-bg-loading');
    expect(imageBgLoading).toBeNull();
  });

  it('should apply quarter-width class if showQuarterWidth is true', () => {
    component.showQuarterWidth = true;
    fixture.detectChanges();

    const textElement = fixture.nativeElement.querySelector('.text');
    expect(textElement.classList.contains('quarter-width')).toBe(true);
  });

  it('should not apply quarter-width class if showQuarterWidth is false', () => {
    component.showQuarterWidth = false;
    fixture.detectChanges();

    const textElement = fixture.nativeElement.querySelector('.text');
    expect(textElement.classList.contains('quarter-width')).toBe(false);
  });

  it('should render correct number of text-line elements based on rows input', () => {
    const rows = 5;
    component.rows = rows;
    fixture.detectChanges();

    const textLineElements =
      fixture.nativeElement.querySelectorAll('.text-line');
    expect(textLineElements.length).toBe(rows);
  });

  it('should set the height of text-line elements based on lineHeight input', () => {
    const lineHeight = '40px';
    component.lineHeight = lineHeight;
    fixture.detectChanges();

    const textLineElements =
      fixture.nativeElement.querySelectorAll('.text-line');
    textLineElements.forEach((textLine: any) => {
      expect(textLine.style.height).toBe(lineHeight);
    });
  });
});
