const sharp = require('sharp');
const { types } = require('./types');

const imageResizer = (image, size, quality, type = 'webp') =>
new Promise((res, rej) => {
  sharp(new Buffer(image.buffer))
    .resize(size.w, size.h)
    .max()
    [types[type].sharp]({quality: quality})
    .toBuffer()
    .then(data => {
      return res({
        image: data,
        contentType: types[type].contentType,
      });
    })
    .catch(err => rej(err))
});

exports.imageResizr = imageResizer;
