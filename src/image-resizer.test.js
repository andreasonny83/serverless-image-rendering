const ImageResizr = require('./image-resizer');

describe('imageResizr', () => {
  let imageResizr;

  const mockedTypes = [{
    sharp: 'bla',
    contentType: 'image/bla'
  }];

  describe('getImageType', () => {
    beforeEach(() => {
      imageResizr = new ImageResizr(mockedTypes);
    });

    it('should return an object', () => {
      const t = imageResizr.getImageType('bla');

      expect(typeof t).toBe('object');
    });

    it('it should return an object containg a `sharp` key', () => {
      const t = imageResizr.getImageType('bla');

      expect(t.sharp).toBeDefined();
    });

    it('it should return an object containg a `contentType` key', () => {
      const t = imageResizr.getImageType('bla');

      expect(t.contentType).toBeDefined();
    });

    it('if type is not found in the passed configuration it should' +
    'return a default type', () => {
      const t = imageResizr.getImageType('not-defined');

      expect(t.sharp).toBe('webp');
      expect(t.contentType).toBe('image/webp');
    });

    it('the default type should be accepted as an optional attribute', () => {
      const t = imageResizr.getImageType('not-defined', 'default');

      expect(t.sharp).toBe('default');
      expect(t.contentType).toBe('image/default');
    });
  });

  describe('resize', () => {
    const SharpStub = jest.fn().mockImplementation((any) => ({
      resize: function() { return this },
      max: function() { return this },
      webp: function(x) { return this },
      toBuffer: () => Promise.resolve('image')
    }));

    it('should return a resized image', async () => {
      const mockImage = new Buffer('foo');
      const options = { w: 600, h: 600 };
      imageResizr = new ImageResizr(mockedTypes, SharpStub);
      const t = await imageResizr.resize(mockImage, options);

      expect(SharpStub).toHaveBeenCalledWith(new Buffer(mockImage.buffer));
      expect(t).toMatchObject({contentType: 'image/webp', image: 'image'});
    });
  });
});
