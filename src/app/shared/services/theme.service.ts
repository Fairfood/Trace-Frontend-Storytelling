import { Injectable } from '@angular/core';
import { Theme, primary } from '../config/theme';

/**
 * Overall, this function is a crucial part of dynamically changing the appearance of the application based on the selected
 * theme by updating CSS variables accordingly.
 * The CSS variables will be used throughout the application to style various components based on the chosen theme.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * The currently active theme.
   */
  private active: Theme = primary;

  /**
   * Sets the active theme by updating CSS variables for the document.
   * @param theme The theme to set as active.
   */
  setActiveTheme(theme: Theme): void {
    this.active = theme;

    /**
     * Iterate over each property in the theme and set CSS variables
     */
    Object.keys(this.active.properties).forEach(property => {
      /**
       * Set the CSS variable on the document's root element
       */
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  /**
   * Configures the theme based on the provided theme data and returns markers SVG data for small and big markers.
   * @param themeData The theme data containing color properties.
   * @returns An object containing SVG data for small and big markers.
   */
  themeConfiguration(themeData: any): any {
    // Destructure theme data properties
    const {
      primary_colour,
      text_colour,
      secondary_colour,
      primary_colour_light,
      action_colour,
      primary_colour_shade_1,
      primary_colour_shade_2,
      primary_colour_shade_3,
      stroke_colour,
      page_bg_colour,
    } = themeData;

    // Create a custom theme object based on the provided theme data
    const customTheme = {
      name: 'custom',
      properties: {
        '--color-primary': primary_colour ?? '#4DCAF4',
        '--color-text-primary': text_colour ?? '#003A60',
        '--color-secondary': secondary_colour ?? '#003A60',
        '--color-light-primary': primary_colour_light ?? '#9DDCF1',
        '--color-button': action_colour ?? '#EA2553',
        '--color-primary-shade1': primary_colour_shade_1 ?? '#DDF3FF',
        '--color-primary-shade2': primary_colour_shade_2 ?? '#f7fcff',
        '--color-primary-shade3':
          primary_colour_shade_3 || primary_colour_shade_1,
        '--color-primary-shade4': page_bg_colour ?? '#f9feff',
        '--color-stroke': stroke_colour ?? '#bfecfb',
      },
    };

    // SVG data for a small marker
    const markerSmallSvg = [
      '<?xml version="1.0"?>',
      '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '<circle class="fill-secondary" cx="4.99988" cy="4.99994" r="5" fill="{{ color }}"/>',
      '</svg>',
    ].join('\n');

    // SVG data for a big marker
    const markerBigSvg = [
      '<?xml version="1.0"?>',
      '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '<circle class="fill-secondary" cx="20" cy="20" r="18" fill="{{ color }}"/>',
      '<circle class="stroke-secondary" cx="20" cy="20" r="14.5" stroke="{{ color }}"/>',
      '</svg>',
    ].join('\n');

    // Set the active theme using the custom theme object
    this.setActiveTheme(customTheme);

    // Return SVG data for small and big markers
    return {
      markerSmallSvg,
      markerBigSvg,
    };
  }
}
