import { GenerateArrayFromNumberPipe } from './generate-n.pipe';

describe('GenerateArrayFromNumberPipe', () => {
  let pipe: GenerateArrayFromNumberPipe;

  beforeEach(() => {
    // Arrange: Create a new instance of the pipe
    pipe = new GenerateArrayFromNumberPipe();
  });

  it('should be created', () => {
    // Assert: Check if the pipe instance is created successfully
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should generate an array of numbers from 1 to the given number', () => {
      // Arrange
      const value = 5;

      // Act: Call the transform function
      const result = pipe.transform(value);

      // Assert: Check the result
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle the case when the input is 0', () => {
      // Arrange
      const value = 0;

      // Act: Call the transform function
      const result = pipe.transform(value);

      // Assert: Check the result
      expect(result).toEqual([]);
    });

    it('should handle negative input by returning an empty array', () => {
      // Arrange
      const value = -5;

      // Act: Call the transform function
      const result = pipe.transform(value);

      // Assert: Check the result
      expect(result).toEqual([]);
    });
  });
});
