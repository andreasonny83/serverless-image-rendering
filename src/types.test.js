const { types } = require('./types');

describe('types', () => {
  test('types should be defined', () => {
    expect(types).toBeDefined();
  });

  test('types should be an object', () => {
    expect(types).toBeInstanceOf(Object);
  });

  test('types should contain a list of valid image formats', () => {
    expect(types.webp).toBeDefined();
    expect(types.jpeg).toBeDefined();
    expect(types.png).toBeDefined();
  });

  test('each image format should contain a `sharp` and a `contentType` value', () => {
    expect(types.webp.sharp).toBeDefined();
    expect(types.webp.contentType).toBeDefined();
  });
});
