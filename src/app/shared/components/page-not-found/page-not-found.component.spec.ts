import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct redirect URL in the template', () => {
    const redirectUrlElement = fixture.debugElement.query(By.css('a'));
    expect(redirectUrlElement.nativeElement.getAttribute('href')).toBe(component.redirectUrl);
  });

  it('should display the "Please check the url" message', () => {
    const messageElement = fixture.debugElement.query(By.css('.font-heading'));
    expect(messageElement.nativeElement.textContent).toContain('Please check the url');
  });

  it('should render the "Go to Trace" link', () => {
    const linkElement = fixture.debugElement.query(By.css('a'));
    expect(linkElement.nativeElement.textContent).toContain('Trace');
  });

  it('should display the "Or" message', () => {
    const orMessageElement = fixture.debugElement.query(By.css('.font-subheading'));
    expect(orMessageElement.nativeElement.textContent.trim()).toBe('Or');
  });

  it('should display the image', () => {
    const imgElement = fixture.debugElement.query(By.css('.img-not-found'));
    expect(imgElement).toBeTruthy();
  });
});
