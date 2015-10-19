Orient an image based on its EXIF orientation tag and draw it to a canvas for further processing.

[See a demo](http://rawgit.com/buunguyen/exif-orient/master/demo/index.html).

### Usage

This library exports a single function `exifOrient` (support UMD):

```js
/**
 * @param {HTMLImageElement | String} img - the image element or base64.
 * @param {Number} orientation - the EXIF orientation.
 * @param {Function} cb (optional) - the callback function.
 * @return {HTMLCanvasElement} a canvas object.
 */
exifOrient(img, orientation, cb)
```

__Example__
```js

// 1. Read orientation tag using exif-js (https://github.com/exif-js/exif-js)
// Note: can use any EXIF parsing library, exif-js is just an example
EXIF.getData(img, function () {
  var orientation = img.exifdata.Orientation

  // 2. Invoke `exifOrient` to orient the image and get back a canvas
  exifOrient(img, orientation, function (err, canvas) {

    // 3. Do whatever you want with the canvas, e.g. render it into an image
  })
})
```

### Changes

v0.0.2
* Update README

v0.0.1
* Initial release
