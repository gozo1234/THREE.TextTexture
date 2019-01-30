# THREE.TextTexture

`class THREE.TextTexture extends THREE.Texture`

An instance of `TextTexture` is a texture for the text writing.

## demo

[Try it out!](https://seregpie.github.io/THREE.TextTexture/)

## setup

### npm

```shell
npm i three.texttexture
```

### ES module

```javascript
import TextTexture from 'three.texttexture';
```

### browser

```html
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/three.texttexture"></script>
```

The class `TextTexture` will be available under the namespace `THREE`.

## members

```
.constructor({
  align,
  anisotropy,
  autoRedraw,
  fillStyle,
  fontFamily,
  fontSize,
  fontStyle,
  fontVariant,
  fontWeight,
  format,
  magFilter,
  mapping,
  minFilter,
  padding,
  strokeStyle,
  strokeWidth,
  text,
  textLineHeight,
  type,
  wrapS,
  wrapT,
})
```

```javascript
let texture = new THREE.TextTexture({
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 32,
  fontStyle: 'italic',
  text: 'Carpe Diem',
});
let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
let sprite = new THREE.Sprite(material);
sprite.scale.setX(texture.imageAspect).multiplyScalar(10);
scene.add(sprite);
```

---

`.text = ''`

The text to write on the canvas.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.align = 'center'`

The horizontal alignment of the text. Possible values are `'center'`, `'left'` and `'right'`.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.lines`

*read-only*

The text split by the new line character.

---

`.textLineHeight = 1.15`

The height of a text line. The pixels are calculated relative to the font size.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontFamily = 'sans-serif'`

The font family of the text.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontSize = 16`

The font size of the text in pixels.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontWeight = 'normal'`

The font weight of the text. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontVariant = 'normal'`

The font variant of the text. Possible values are `'normal'` and `'small-caps'`.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.fontStyle = 'normal'`

The font style of the text. Possible values are `'normal'`, `'italic'` and `'oblique'`.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.font`

*read-only*

The combined font properties.

---

`.fillStyle = '#fff'`

The color or the style of the text.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.strokeWidth = 0`

The thickness of the stroke effect. The pixels are calculated relative to the font size.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.strokeStyle = '#000'`

The color or the style of the stroke effect.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.padding = 0.25`

The space around the text. The pixels are calculated relative to the font size.

Changing the value will redraw the canvas if `autoRedraw` is `true`.

---

`.redraw()`

Redraws the canvas.

---

`.autoRedraw = true`

If `false`, changing properties will **not** redraw the canvas.

Make use of it if you want to change multiple properties at once. This way you will avoid unnecessary `.redraw()` calls.

```javascript
texture.autoRedraw = false;
texture.text = 'Memento Mori';
texture.fontWeight = 'bold';
texture.fontSize = 48;
texture.redraw();
texture.autoRedraw = true;
```

---

`.aspect`

*read-only*

The width of the canvas devided by the height. If the width or the height is 0, the value will be 1.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
