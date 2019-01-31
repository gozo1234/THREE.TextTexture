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
  fillStyle,
  fontFamily,
  fontSize,
  fontStyle,
  fontVariant,
  fontWeight,
  format,
  lineSpacing,
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

---

`.text = ''`

The text to write on the canvas.

---

`.lines`

*read-only*

The lines of text.

---

`.fontFamily = 'sans-serif'`

The font family of the text.

---

`.fontSize = 16`

The font size of the text in pixels.

---

`.fontWeight = 'normal'`

The font weight of the text. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`.

---

`.fontVariant = 'normal'`

The font variant of the text. Possible values are `'normal'` and `'small-caps'`.

---

`.fontStyle = 'normal'`

The font style of the text. Possible values are `'normal'`, `'italic'` and `'oblique'`.

---

`.font`

*read-only*

The combined font properties.

---

`.fillStyle = '#fff'`

The color or the style of the text.

---

`.strokeWidth = 0`

The thickness of the stroke effect. The pixels are calculated relative to the font size.

---

`.strokeStyle = '#000'`

The color or the style of the stroke effect.

---

`.align = 'center'`

The horizontal alignment of the text. Possible values are `'center'`, `'left'` and `'right'`.

---

`.lineSpacing = 0.15`

The vertical distance between the lines of text. The pixels are calculated relative to the font size.

---

`.padding = 0.25`

The space around the text. The pixels are calculated relative to the font size.

## see also

- [THREE.TextSprite](https://github.com/SeregPie/THREE.TextSprite)
