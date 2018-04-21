const app = require('express')();
const bodyParser = require('body-parser');
const Sharp = require('sharp');
const Types = require('./src/types');
const ImageFetcher = require('./src/s3-image-fetcher');
const ImageResizr = require('./src/image-resizer');
require('dotenv').config();

app.use(bodyParser.json());

const displayStatus = () => ({
  status: `OK`, });

app.get('/status', (req, res) => {
  res.status(200).send(displayStatus());
});

app.get('/resize-image', (req, res) => {
  const imageFetcher = new ImageFetcher(process.env.BUCKET);
  const imageResizr = new ImageResizr(Types, Sharp);

  const fileName = req.query && req.query.f;
  const quality = req.query && +req.query.q || 100;
  const type = req.query && req.query.t;
  const size = {
    w: req && +req.query.w || null,
    h: req && +req.query.h || null,
  };

  return imageFetcher.fetchImage(fileName)
    .then(data => imageResizr.resize(data.image, size, quality, type))
    .then(data => {
      const img = new Buffer(data.image.buffer, 'base64');

      res.writeHead(200, {
        'Content-Type': data.contentType
      });
      res.end(img);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(400).send(error.message || error);
    });
});

app.get('/fetch-image', (req, res) => {
  const imageFetcher = new ImageFetcher(process.env.BUCKET);
  const fileName = req.query && req.query.f;

  return imageFetcher.fetchImage(fileName)
    .then(data => {
      const contentType = data.contentType;
      const img = new Buffer(data.image.buffer, 'base64');

      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(img);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(400).send(error.message || error);
    });
});

const server = app.listen(3000, () =>
  console.log(`Listening on http://localhost:${server.address().port}`));
