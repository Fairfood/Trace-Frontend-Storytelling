import { ProgramSymbolPipe } from './program-symbol.pipe';

describe('ProgramSymbolPipe', () => {
  let pipe: ProgramSymbolPipe;

  beforeEach(() => {
    pipe = new ProgramSymbolPipe();
  });
  it('create an instance', () => {
    const pipe = new ProgramSymbolPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return true when type is "left" and symbol is in leftSymbols', () => {
    const item = { symbol: '€' };
    expect(pipe.transform(item, 'left')).toBeTrue();
  });

  it('should return true when type is "right" and symbol is in rightSymbols', () => {
    const item = { symbol: '.' };
    expect(pipe.transform(item, 'right')).toBeTrue();
  });

  it('should return false when type is "left" and symbol is not in leftSymbols', () => {
    const item = { symbol: '$' };
    expect(pipe.transform(item, 'left')).toBeTrue();
  });

  it('should return false when type is "right" and symbol is not in rightSymbols', () => {
    const item = { symbol: '€' };
    expect(pipe.transform(item, 'right')).toBeFalse();
  });

  it('should return false when symbol is falsy', () => {
    const item: any = { symbol: null };
    expect(pipe.transform(item, 'left')).toBeFalse();
    expect(pipe.transform(item, 'right')).toBeFalse();
  });
});
