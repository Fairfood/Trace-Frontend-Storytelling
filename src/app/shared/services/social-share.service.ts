import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export interface LinkedinData {
  title: string;
  description: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  constructor(private readonly metaService: Meta) {}

  /**
   * Update metadata tags for social sharing based on provided LinkedIn data.
   * @param data The LinkedIn data containing title, description, and URL.
   */
  updateTitle(data: LinkedinData): void {
    const { title, description, url } = data;

    // Update Open Graph (og) meta tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'og:url', content: url });

    // Update Twitter meta tags
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });

    // Update other meta tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      itemprop: 'description',
      content: description,
    });
  }
}
