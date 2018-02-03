const Types = require('./Types');

describe('Types', () => {
  test('Types should be defined', () => {
    expect(Types).toBeDefined();
  });

  test('Types should be an array of object', () => {
    expect(Array.isArray(Types)).toBe(true);
    expect(Types.length).not.toBe(0);
  });

  test(`Types objects should contain a 'sharp' key`, () => {
    expect(Types[0].sharp).toBeDefined();
  });

  test(`Types objects should contain a 'contentType' key`, () => {
    expect(Types[0].contentType).toBeDefined();
  });
});
