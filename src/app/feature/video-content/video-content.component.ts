/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ShareButtonComponent } from 'src/app/shared/components/share-button';
import { StoryService } from 'src/app/shared/services/story.service';
import { StoryStoreService } from 'src/app/shared/store';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.scss'],
  standalone: true,
  imports: [CommonModule, ShareButtonComponent],
})
export class VideoContentComponent implements OnInit, OnDestroy {
  @Input() sharingData: any;
  videoUrl: SafeResourceUrl | undefined;

  sub: Subscription[] = [];
  componentData: {
    videoTitle: string;
    videoDescription: string;
    buttonText: string;
    buttonUrl: string;
  };

  constructor(
    private storyService: StoryService,
    private store: StoryStoreService
  ) {}

  ngOnInit(): void {
    const sub1 = this.store.storyConfiguration$.subscribe({
      next: (res: any) => {
        if (res) {
          // Assign a safe URL to the videoUrl property
          const {
            video_url,
            video_title,
            video_description,
            action_button_text,
            action_button_url,
          } = res;
          this.videoUrl = video_url;
          this.componentData = {
            videoTitle: video_title || '',
            videoDescription: video_description || '',
            buttonText: action_button_text || 'Share',
            buttonUrl: action_button_url,
          };
        }
      },
    });

    this.sub.push(sub1);
    const sub2 = this.store.sharingData$.subscribe({
      next: (res: any) => {
        if (res) {
          this.sharingData = res;
        }
      },
    });
    this.sub.push(sub2);
  }

  /**
   * Button action
   * @param url string
   */
  getLink(): void {
    this.storyService.getActionLink(this.componentData.buttonUrl);
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}
