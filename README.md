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

### constructor

```
new THREE.TextTexture({
  align,
  anisotropy,
  createCanvas,
  fillStyle,
  fontFamily,
  fontSize,
  fontStyle,
  fontVariant,
  fontWeight,
  format,
  lineGap,
  loadFontFace,
  magFilter,
  mapping,
  minFilter,
  padding,
  strokeStyle,
  strokeWidth,
  text,
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
  text: [
    'Twinkle, twinkle, little star,',
    'How I wonder what you are!',
    'Up above the world so high,',
    'Like a diamond in the sky.',
  ].join('\n'),
});
let material = new THREE.SpriteMaterial({
  color: 0xffffbb,
  map: texture,
});
let sprite = new THREE.Sprite(material);
sprite.scale.setX(texture.image.width / texture.image.height).multiplyScalar(10);
scene.add(sprite);
```

### properties

`.text = ''`

The text.

---

`.lines`

*read-only*

The text splitted by the newline character.

---

`.fontFamily = 'sans-serif'`

The font family.

---

`.fontSize = 16`

The font size in pixels.

---

`.fontWeight = 'normal'`

The font weight. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.

---

`.fontVariant = 'normal'`

The font variant. Possible values are `'normal'` and `'small-caps'`.

---

`.fontStyle = 'normal'`

The font style. Possible values are `'normal'`, `'italic'` and `'oblique'`.

---

`.font`

*read-only*

The combined font properties.

---

`.fillStyle = '#fff'`

The fill color or the style of the text characters.

---

`.strokeWidth = 0`

The stroke width of the text characters. The pixels are calculated relative to the font size.

---

`.strokeStyle = '#000'`

The stroke color or the style of the text characters.

---

`.align = 'center'`

The horizontal text alignment. Possible values are `'center'`, `'left'` and `'right'`.

---

`.lineGap = 0.15`

The vertical distance between the text lines. The pixels are calculated relative to the font size.

---

`.padding = 0.25`

The space around the text. The pixels are calculated relative to the font size.

---

`.createCanvas()`

Creates a new `Canvas` instance.

---

`.loadFontFace(family, style, variant, weight)`

Forces a font face to be loaded.

---

Provide custom `loadFontFace` function to support older browsers.

```javascript
loadFontFace(family, style, variant, weight) {
  return (new FontFaceObserver(family, {style, weight})).load();
}
```

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
