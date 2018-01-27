const mockAWS = require('aws-sdk-mock');
const ImageFetcher = require('./s3-image-fetcher');

describe('S3 Image Fetcher', () => {
  describe('fetchImage', () => {
    afterAll(() => {
      mockAWS.restore('S3');
    });

    test('fetchImage should be defined', () => {
      const imageFetcher = new ImageFetcher();

      expect(imageFetcher.fetchImage).toBeDefined();
    });

    test('should throw an error if a filename is not passed',
    async () => {
      const imageFetcher = new ImageFetcher();

      expect(imageFetcher.fetchImage())
        .rejects.toMatch('Filename not specified')
    });

    test(`should throw an error if the filename doesn't exist`,
    async () => {
      mockAWS.mock('S3', 'headObject', (params, callback) =>
        callback('Test error message'));

      const imageFetcher = new ImageFetcher('test_bucket');

      await expect(imageFetcher.fetchImage('test.jpg'))
        .rejects.toMatch('Test error message');
    });
  });
});
