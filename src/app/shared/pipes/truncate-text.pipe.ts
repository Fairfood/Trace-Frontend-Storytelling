import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value) {
      return '';
    }

    if (value.length > maxLength) {
      return `${value.substring(0, maxLength)}...`;
    } else {
      return value;
    }
  }
}
