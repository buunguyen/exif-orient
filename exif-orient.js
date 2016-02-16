(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.exifOrient = factory()
  }
}(this, function () {

  /**
   * Orients an image based on Exif orientation and draws it on a canvas.
   * @param {HTMLImageElement | String} img - the image element, base64 string or URL.
   * @param {Number} orientation - the Exif orientation: 1-8.
   * @param {Function} cb (optional) - the callback function.
   * @return {HTMLCanvasElement} a canvas object.
   */
  return function exifOrient(img, orientation, cb) {
    if (typeof orientation !== 'number' || orientation < 1 || orientation > 8) {
      return cb(new Error('orientation must be a number from 1 to 8'))
    }
    if (typeof img !== 'string' && !(img instanceof HTMLImageElement)) {
      return cb(new Error('img must be a string or an HTMLImageElement'))
    }

    cb = cb || Function()

    if (typeof img === 'string') {
      var _img = new Image()
      _img.src = img
      _img.onerror = cb
      _img.onload = function () {
        orient(_img, orientation, cb)
      }
    }
    else {
      orient(img, orientation, cb)
    }
  }

  function orient(img, orientation, cb) {
    /*    1        2       3      4         5            6           7          8
     * 888888  888888      88  88      8888888888  88                  88  8888888888
     * 88          88      88  88      88  88      88  88          88  88      88  88
     * 8888      8888    8888  8888    88          8888888888  8888888888          88
     * 88          88      88  88
     * 88          88  888888  888888
     * source: http://sylvana.net/jpegcrop/exif_orientation.html
     */
    var transforms = [
    // [flip-x, flip-y, deg]
      [false, false, 0],   // 1
      [true,  false, 0],   // 2
      [false, false, 180], // 3
      [false, true,  0],   // 4
      [true,  false, 90],  // 5
      [false, false, 90],  // 6
      [true,  false, -90], // 7
      [false, false, -90]  // 8
    ]

    var transform = transforms[orientation - 1] || transforms[0]
    var flipX = transform[0]
    var flipY = transform[1]
    var deg = transform[2]

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var width = img.naturalWidth
    var height = img.naturalHeight

    canvas.width = Math.abs(deg) === 90 ? height : width
    canvas.height = Math.abs(deg) === 90 ? width : height

    if (flipX || flipY) {
      flip(canvas, ctx, flipX, flipY)
    }

    if (deg) {
      rotate(canvas, ctx, deg)
    }

    ctx.drawImage(img, 0, 0)
    cb(null, canvas)
  }

  function flip(canvas, ctx, flipX, flipY) {
    ctx.translate(
      flipX ? canvas.width : 0,
      flipY ? canvas.height : 0)
    ctx.scale(
      flipX ? -1 : 1,
      flipY ? -1 : 1)
  }

  function rotate(canvas, ctx, deg) {
    var width = canvas.width
    var height = canvas.height

    ctx.translate(width / 2, height / 2)
    ctx.rotate(deg * (Math.PI / 180))
    ctx.translate(-width / 2, -height / 2)

    if (Math.abs(deg) === 90) {
      ctx.translate((width - height) / 2, -(width - height) / 2)
    }
  }
}));
