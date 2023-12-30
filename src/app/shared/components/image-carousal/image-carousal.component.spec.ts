import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCarousalComponent } from './image-carousal.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ImageCarousalComponent test when array length is 3', () => {
  let component: ImageCarousalComponent;
  let fixture: ComponentFixture<ImageCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarousalComponent, CommonModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarousalComponent);
    component = fixture.componentInstance;
    component.isProduct = false;
    component.imageArray = [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
      {
        name: 'test3',
      },
    ];
    component.activeLeft = 2;
    component.active = 0;
    component.activeRight = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('3 image indices', () => {
    expect(component.active).toEqual(0);
    expect(component.activeLeft).toEqual(component.imageArray.length - 1);
    expect(component.activeRight).toEqual(1);
  });

  it('Should change active index when click next', () => {
    component.changeImage('next');
    expect(component.active).toEqual(1);
    expect(component.activeLeft).toEqual(0);
    expect(component.activeRight).toEqual(2);
  });

  it('Should change active index when click previous', () => {
    component.changeImage('previous');
    expect(component.active).toEqual(2);
    expect(component.activeLeft).toEqual(1);
    expect(component.activeRight).toEqual(0);
  });

  it('Should toggle active index when the array length is two', () => {
    component.changeImage('previous');
    expect(component.active).toEqual(2);
    expect(component.activeLeft).toEqual(1);
    expect(component.activeRight).toEqual(0);
  });
});

describe('ImageCarousalComponent test when array length is 2', () => {
  let component: ImageCarousalComponent;
  let fixture: ComponentFixture<ImageCarousalComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarousalComponent, CommonModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarousalComponent);
    component = fixture.componentInstance;
    component.isProduct = false;
    component.imageArray = [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
    ];
    component.activeLeft = -1;
    component.active = 0;
    component.activeRight = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('3 image indices', () => {
    expect(component.active).toEqual(0);
    expect(component.activeLeft).toEqual(-1);
    expect(component.activeRight).toEqual(1);
  });

  it('Should toggle active and active right indexes', () => {
    component.changeImage('next');
    expect(component.active).toEqual(1);
    expect(component.activeRight).toEqual(0);
    component.changeImage('previous');
    expect(component.active).toEqual(0);
    expect(component.activeRight).toEqual(1);
  });
});

describe('ImageCarousalComponent when isProduct value is true and array length is 4', () => {
  let component: ImageCarousalComponent;
  let fixture: ComponentFixture<ImageCarousalComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarousalComponent, CommonModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarousalComponent);
    component = fixture.componentInstance;
    component.isProduct = true;
    component.imageArray = [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
      {
        name: 'test122',
      },
      {
        name: 'test23',
      },
    ];
    component.activeLeft = -1;
    component.active = 0;
    component.activeRight = -1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('3 image indices. Only active index variable is used', () => {
    expect(component.active).toEqual(0);
    expect(component.activeLeft).toEqual(-1);
    expect(component.activeRight).toEqual(-1);
  });

  it('Should read from array in circular manner', () => {
    component.changeImage('next');
    expect(component.active).toEqual(1);
    component.changeImage('previous');
    expect(component.active).toEqual(0);
    component.changeImage('previous');
    expect(component.active).toEqual(component.imageArray.length - 1);
  });
});
