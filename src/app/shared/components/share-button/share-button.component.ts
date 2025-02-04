import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs/operators';
import { timer } from 'rxjs';
/**
 * Import external modules
 */
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslateModule, ClipboardModule],
})
export class ShareButtonComponent {
  /**
   * Button data
   */
  @Input() data: any;

  expand = false;
  /**
   * Initialising Facebook SDK
   */
  constructor() {
    const url = 'https://connect.facebook.net/en_US/sdk.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      let script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  /**
   * Toggle button to expand or collapse
   */
  toggleButton(): void {
    this.expand = !this.expand;
  }

  /**
   * Show and hide tooltip
   * @param tooltip: MatTooltip
   */
  showHideTooltip(tooltip: MatTooltip): void {
    tooltip.show();

    /**
     * Hide tooltip after 2 seconds
     */
    timer(2000)
      .pipe(delay(2000))
      .subscribe(() => {
        try {
          tooltip.hide();
        } catch (error) {
          console.error('Error hiding tooltip:', error);
        }
      });
  }
}
