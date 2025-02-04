/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ShareButtonComponent } from 'src/app/shared/components/share-button';
import { StoryService } from 'src/app/shared/services/story.service';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.scss'],
  standalone: true,
  imports: [CommonModule, ShareButtonComponent],
})
export class VideoContentComponent implements OnInit {
  @Input() data: any;
  @Input() sharingData: any;
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private storyService: StoryService,
    private sanitizer: DomSanitizer
  ) {}
    
  ngOnInit(): void {
    // Assign a safe URL to the videoUrl property
    this.videoUrl = this.data?.video_url;
  }

  /**
   * Button action
   * @param url string
   */
  getLink(url: string): void {
    this.storyService.getActionLink(url);
  }
}
