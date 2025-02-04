import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { Theme } from '../config/theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setActiveTheme', () => {
    it('should set the active theme and update CSS variables', () => {
      const theme: Theme = {
        name: 'test',
        properties: {
          '--color-primary': 'red',
          '--color-secondary': 'blue',
        },
      };

      service.setActiveTheme(theme);

      const rootStyles = getComputedStyle(document.documentElement);

      expect(rootStyles.getPropertyValue('--color-primary')).toBe('red');
      expect(rootStyles.getPropertyValue('--color-secondary')).toBe('blue');
    });
  });

  describe('themeConfiguration', () => {
    it('should return SVG data for small and big markers', () => {
      const themeData = {
        primary_colour: '#123456',
        text_colour: '#789abc',
        secondary_colour: '#def123',
        primary_colour_light: '#456789',
        action_colour: '#cdef01',
        primary_colour_shade_1: '#234567',
        primary_colour_shade_2: '#89abcd',
        primary_colour_shade_3: '#ef0123',
        stroke_colour: '#456def',
        page_bg_colour: '#01ab89',
      };

      const svgData = service.themeConfiguration(themeData);

      expect(svgData.markerSmallSvg).toContain(
        '<?xml version="1.0"?>'
      );
      expect(svgData.markerBigSvg).toContain(
        '<?xml version="1.0"?>'
      );
    });
  });
});
