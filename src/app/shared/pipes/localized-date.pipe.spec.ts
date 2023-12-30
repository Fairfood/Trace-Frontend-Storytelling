import { LocalizedDatePipe } from './localized-date.pipe';
import { TranslateService } from '@ngx-translate/core';

describe('LocalizedDatePipe', () => {
  let pipe: LocalizedDatePipe;
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    translateServiceMock = {
      currentLang: 'en',
    };
    pipe = new LocalizedDatePipe(translateServiceMock as TranslateService);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a date using the default format', () => {
    const inputDate = new Date(2023, 9, 6); // October 6, 2023
    const transformedDate = pipe.transform(inputDate);

    expect(transformedDate).toBe('Oct 6, 2023');
  });

  it('should transform a date using a specified format', () => {
    const inputDate = new Date(2023, 9, 6); // October 6, 2023
    const transformedDate = pipe.transform(inputDate, 'shortDate');

    expect(transformedDate).toBe('10/6/23');
  });

  it('should transform a date with null input', () => {
    const transformedDate = pipe.transform(null);

    expect(transformedDate).toBeNull();
  });

  it('should transform a date with undefined input', () => {
    const transformedDate = pipe.transform(undefined);

    expect(transformedDate).toBeNull();
  });
});
