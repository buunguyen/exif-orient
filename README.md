Orient an image based on its Exif orientation tag and draw it to a canvas for further processing.

[See a demo](http://rawgit.com/buunguyen/exif-orient/master/demo/index.html).

Install from NPM or Bower:
```
npm install exif-orient --save
bower install exif-orient --save
```

### Usage

This library exports a single function `exifOrient` (support UMD):

```js
/**
 * @param {HTMLImageElement | HTMLCanvasElement | String} img - image, canvas, base64 string or URL.
 * @param {Number} orientation - the Exif orientation.
 * @param {Function} cb (optional) - the callback function.
 * @return {HTMLCanvasElement} a canvas object.
 */
exifOrient(img, orientation, cb)
```

__Example__
```js

// 1. Read orientation tag using exif-js (https://github.com/exif-js/exif-js)
// Note: can use any Exif parsing library, exif-js is just an example
EXIF.getData(img, function () {
  var orientation = img.exifdata.Orientation

  // 2. Invoke `exifOrient` to orient the image and get back a canvas
  exifOrient(img, orientation, function (err, canvas) {

    // 3. Do whatever you want with the canvas, e.g. render it into an image
  })
})
```

### Changes

v0.0.5
* Enforce argument types and values
* Allow canvas to be used as an argument of exifOrient

v0.0.4
* Add semicolon at EOF to be friendly with minifiers

v0.0.3
* Rename EXIF => Exif

v0.0.2
* Update README

v0.0.1
* Initial release
