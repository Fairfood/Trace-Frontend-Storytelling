import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
  let pipe: TruncateTextPipe;

  beforeEach(() => {
    pipe = new TruncateTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate the text when it is longer than the specified length', () => {
    const text = 'This is a long text that needs to be truncated.';
    const maxLength = 10;

    const truncatedText = pipe.transform(text, maxLength);

    expect(truncatedText).toBe('This is a ...');
  });

  it('should not truncate the text when it is shorter than the specified length', () => {
    const text = 'Short text';
    const maxLength = 20;

    const truncatedText = pipe.transform(text, maxLength);

    expect(truncatedText).toBe(text);
  });

  it('should handle empty input', () => {
    const text = '';
    const maxLength = 10;

    const truncatedText = pipe.transform(text, maxLength);

    expect(truncatedText).toBe('');
  });

  it('should handle null input', () => {
    const text: string = null;
    const maxLength = 10;

    const truncatedText = pipe.transform(text, maxLength);

    expect(truncatedText).toBe('');
  });

  it('should handle undefined input', () => {
    const text: any = undefined;
    const maxLength = 10;

    const truncatedText = pipe.transform(text, maxLength);

    expect(truncatedText).toBe('');
  });
});
