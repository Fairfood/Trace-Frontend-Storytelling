import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-image-carousal',
  templateUrl: './image-carousal.component.html',
  styleUrls: ['./image-carousal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
})
export class ImageCarousalComponent implements OnChanges {
  @Input() imageArray: any[];
  @Input() isProduct: boolean;

  @Output() currentActiveIndex = new EventEmitter();

  active: any;
  activeRight: any;
  activeLeft: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageArray']) {
      const imageArray = changes['imageArray'].currentValue;
      if (this.isProduct) {
        this.active = 0;
        this.activeRight = -1;
        this.activeLeft = -1;
      } else {
        if (imageArray.length > 2) {
          this.activeLeft = imageArray.length - 1;
          this.active = 0;
          this.activeRight = 1;
        } else if (imageArray.length === 2) {
          this.active = 0;
          this.activeRight = 1;
          this.activeLeft = -1;
        } else if (imageArray.length === 1) {
          this.active = 0;
          this.activeRight = -1;
          this.activeLeft = -1;
        }
      }
    }
  }

  changeImage(direction: string): void {
    if (!this.isProduct) {
      // if image array has only two then switching indexes 0 and 1
      if (this.imageArray?.length === 2) {
        this.active = +!this.active;
        this.activeRight = +!this.activeRight;
        this.currentActiveIndex.emit(this.active);
      } else if (this.imageArray?.length > 2) {
        // when clicking next increase index
        if (direction === 'next') {
          this.active = this.incrementIndex(this.active);
          this.activeLeft = this.incrementIndex(this.activeLeft);
          this.activeRight = this.incrementIndex(this.activeRight);
        } else {
          this.active = this.decrementIndex(this.active);
          this.activeLeft = this.decrementIndex(this.activeLeft);
          this.activeRight = this.decrementIndex(this.activeRight);
        }
        this.currentActiveIndex.emit(this.active);
      } else {
        console.log('No action');
      }
    } else {
      if (direction === 'next') {
        this.active = this.incrementIndex(this.active);
      } else {
        this.active = this.decrementIndex(this.active);
      }
    }
  }

  decrementIndex(label: number): number {
    if (label === 0) {
      return this.imageArray?.length - 1;
    } else {
      return label - 1;
    }
  }

  incrementIndex(label: number): number {
    if (label === this.imageArray?.length - 1) {
      return 0;
    } else {
      return label + 1;
    }
  }

  /* istanbul ignore next */
  onImgError(event: any): void {
    event.target.src = '../../assets/images/farmers_placeholder.svg';
  }
}
