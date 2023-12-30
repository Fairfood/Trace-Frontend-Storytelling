import { TrimFieldName, sortByKey } from './common';

describe('TrimFieldName function', () => {
  it('should return the same string if it is shorter than the limit', () => {
    const field = 'Hello';
    const limit = 10;
    const result = TrimFieldName(limit, field);
    expect(result).toEqual(field);
  });

  it('should return a trimmed string followed by ellipsis if it is longer than the limit', () => {
    const field = 'This is a long string that needs to be trimmed';
    const limit = 20;
    const result = TrimFieldName(limit, field);
    expect(result).toEqual('This is a long strin...');
  });

  it('should return an empty string if the input string is empty', () => {
    const field = '';
    const limit = 10;
    const result = TrimFieldName(limit, field);
    expect(result).toEqual('');
  });
});


describe('sortByKey', () => {
  it('should sort the array in ascending order by the given key', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' },
    ];
    const key = 'name';
    const dir = 'asc';

    const result = sortByKey(array, key, dir);

    expect(result).toEqual([
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' },
      { id: 1, name: 'John' },
    ]);
  });

  it('should sort the array in descending order by the given key', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' },
    ];
    const key = 'name';
    const dir = 'desc';

    const result = sortByKey(array, key, dir);

    expect(result).toEqual([
      { id: 1, name: 'John' },
      { id: 3, name: 'Bob' },
      { id: 2, name: 'Alice' },
    ]);
  });
});
