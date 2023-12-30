import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ListWithImageComponent,
  IComponentData,
} from './list-with-image.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ListWithImageComponent', () => {
  let component: ListWithImageComponent;
  let fixture: ComponentFixture<ListWithImageComponent>;

  const testData: IComponentData[] = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Description 1',
      imageUrl: 'image1.jpg',
      altText: 'Alt Text 1',
      readMoreUrl: 'https://example.com/item1',
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Description 2',
      imageUrl: 'image2.jpg',
      altText: 'Alt Text 2',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ListWithImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of items', () => {
    component.data = testData;
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items?.length).toBe(testData?.length);
  });

  it('should display a list of items with correct data', () => {
    component.data = testData;
    fixture.detectChanges();

    const listItemElements = fixture.nativeElement.querySelectorAll('ul li');
    expect(listItemElements.length).toBe(testData.length);

    for (let i = 0; i < testData.length; i++) {
      const item = testData[i];
      const listItem = listItemElements[i];
      expect(listItem.querySelector('img').src).toContain(item.imageUrl);
      expect(listItem.querySelector('img').alt).toBe(item.altText);
      expect(listItem.querySelector('.font-section-heading').textContent).toBe(
        item.title
      );
      expect(listItem.querySelector('.font-paragraph').textContent).toContain(
        item.description
      );
    }
  });
  it('should display item title and description', () => {
    component.data = testData;
    fixture.detectChanges();
    const itemElements = fixture.debugElement.queryAll(By.css('li'));
    for (let i = 0; i < testData.length; i++) {
      const item = testData[i];
      const title = itemElements[i]?.query(By.css('.font-section-heading'))
        .nativeElement.textContent;
      const description = itemElements[i].query(By.css('.font-paragraph'))
        .nativeElement.textContent;

      expect(title).toContain(item.title);
      expect(description).toContain(item.description);
    }
  });
});
