import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programSymbol',
  standalone: true,
})
export class ProgramSymbolPipe implements PipeTransform {
  transform(item: any, type: 'left' | 'right'): boolean {
    const { symbol } = item;

    const rightSymbols = ['kg', '.'];
    const leftSymbols = ['€', '$'];

    if (symbol) {
      if (type === 'right' && rightSymbols.includes(symbol)) {
        return true;
      } else if (type === 'left' && leftSymbols.includes(symbol)) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
