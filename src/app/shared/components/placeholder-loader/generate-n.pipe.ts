import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom Angular pipe that generates an array of numbers from 1 to the given number.
 */
@Pipe({
  name: 'generateArray',
  standalone: true
})
export class GenerateArrayFromNumberPipe implements PipeTransform {
  /**
   * Transforms a given number into an array of numbers from 1 to the given number.
   * @param value The number up to which the array will be generated.
   * @returns An array containing numbers from 1 to the given number.
   */
  transform(value: number): number[] {
    // Generate an array of numbers from 1 to the given value
    return Array.from({ length: value }, (_, index) => index + 1);
  }
}
