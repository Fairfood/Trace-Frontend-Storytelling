import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface representing the structure of each item in the list.
 */
export interface IComponentData {
  id: string;
  title: string;
  description: string; // Fixed typo: 'descroption' to 'description'
  imageUrl: string;
  altText: string;
  readMoreUrl?: string;
}

/**
 * This component displays a list of items with images and descriptions.
 * Usage:
 * ```
 * <app-list-with-image [data]="yourDataArray"></app-list-with-image>
 * ```
 */
@Component({
  selector: 'app-list-with-image',
  standalone: true,
  template: `
    <ul>
      <ng-container *ngFor="let item of data; trackBy: trackByFn">
        <li>
          <!-- item image -->
          <img [src]="item?.imageUrl" [alt]="item?.altText" />
          <aside [attr.aria-label]="item?.altText" class="ff-flex-column">
            <span class="font-section-heading font-normal">{{
              item?.title
            }}</span>
            <!-- item description -->
            <p class="font-paragraph">
              {{ item?.description }}
              <a
                class="read-more font-normal color-primary"
                *ngIf="item.readMoreUrl"
                [href]="item?.readMoreUrl"
                target="_blank">
                Read more
              </a>
            </p>
          </aside>
        </li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./list-with-image.component.scss'],
  imports: [CommonModule],
})
export class ListWithImageComponent {
  /**
   * Input data for the list.
   */
  @Input() data: IComponentData[];

  trackByFn(index: number, item: IComponentData): string {
    return item.id; // Use a unique identifier as the trackBy key
  }
}
