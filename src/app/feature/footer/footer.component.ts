/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { StoryStoreService } from 'src/app/shared/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  // Always show fairfood footer
  fairfoodContext = {
    color: '#2DBDE9',
    linkedIn: 'https://www.linkedin.com/company/fairfoodnl/',
    facebook: 'https://www.facebook.com/Fairfood',
    instagram: 'https://www.instagram.com/fairfoodnl/',
    twitter: 'https://twitter.com/fairfood',
  };

  sub: Subscription;
  footerData: any;

  constructor(private store: StoryStoreService) {}

  ngOnInit(): void {
    this.sub = this.store.storyConfiguration$.subscribe({
      next: (res: any) => {
        if (res) {
          this.footerData = res;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
