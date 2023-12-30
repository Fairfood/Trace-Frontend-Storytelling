import { Component, Input } from '@angular/core';
import { GenerateArrayFromNumberPipe } from './generate-n.pipe';
import { CommonModule } from '@angular/common';
/**
 * PlaceholderLoaderComponent is a class representing an Angular component that displays a loader.
 * GenerateArrayFromNumber is a custom pipe being imported for use within this component.
 * CommonModule is imported from Angular's common module.
 */
@Component({
  selector: 'app-placeholder-loader',
  templateUrl: './placeholder-loader.component.html',
  styleUrls: ['./placeholder-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, GenerateArrayFromNumberPipe],
})
export class PlaceholderLoaderComponent {
  @Input() rows: number;
  @Input() showImagePlaceholder = false;
  @Input() showQuarterWidth = false;
  @Input() lineHeight = '30px';
}
