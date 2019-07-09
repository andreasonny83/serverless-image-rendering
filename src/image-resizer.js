class ImageResizr {
  constructor(Types, Sharp) {
    this.types = Types;
    this.sharp = Sharp;
  }

  getImageType(type, def = 'webp') {
    const found = this.types.find(item => item.sharp === type);

    if (!found && type === def) {
      return { sharp: def, contentType: `image/${def}`};
    }

    return found || this.getImageType(def, def);
  }

  resize(image, size, quality, type) {
    if (!image) throw new Error('An Image must be specified');
    if (!size) throw new Error('Image size must be specified');

    const sharpType = this.getImageType(type, 'webp');

    return new Promise((res, rej) => {
      this.sharp(new Buffer(image.buffer))
        .resize(size.w, size.h, { fit: 'inside' })
        [sharpType.sharp]({quality: quality})
        .toBuffer()
        .then(data => {
          return res({
            image: data,
            contentType: sharpType.contentType,
          });
        })
        .catch(err => rej(err))
    });
  }
}

module.exports = ImageResizr;
