import * as THREE from 'three';

import Array_max from './utils/Array/max';
import AsyncFunction_throttle from './utils/AsyncFunction/throttle';
import CSS_font from './utils/CSS/font';
import Object_isUndefined from './utils/Object/isUndefined';

export default class extends THREE.Texture {
	constructor({
		align = 'center',
		anisotropy,
		createCanvas = function() {
			return document.createElement('canvas');
		},
		fillStyle = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		format,
		lineGap = 0.15,
		loadFontFace = function(family, style, variant, weight) {
			let font = CSS_font(style, variant, weight, 1, family);
			return document.fonts.load(font);
		},
		magFilter = THREE.LinearFilter,
		mapping,
		minFilter = THREE.LinearFilter,
		padding = 0.25,
		strokeStyle = '#000',
		strokeWidth = 0,
		text = '',
		type,
		wrapS,
		wrapT,
	} = {}) {
		super(
			createCanvas(),
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy,
		);
		this._align = align;
		this._fillStyle = fillStyle;
		this._fontFamily = fontFamily;
		this._fontSize = fontSize;
		this._fontStyle = fontStyle;
		this._fontVariant = fontVariant;
		this._fontWeight = fontWeight;
		this._lineGap = lineGap;
		this._padding = padding;
		this._strokeStyle = strokeStyle;
		this._strokeWidth = strokeWidth;
		this._text = text;
		this.createCanvas = createCanvas;
		this.loadFontFace = loadFontFace;
		this.redraw = AsyncFunction_throttle(this.redraw, 0);
		this.redraw();
	}

	get text() {
		return this._text;
	}

	set text(value) {
		if (this._text !== value) {
			this._text = value;
			this._lines = undefined;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get lines() {
		if (Object_isUndefined(this._lines)) {
			this._lines = this.computeLines();
		}
		return this._lines;
	}

	computeLines() {
		let {text} = this;
		return text ? text.split('\n') : [];
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set fontFamily(value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get fontWeight() {
		return this._fontWeight;
	}

	set fontWeight(value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get fontVariant() {
		return this._fontVariant;
	}

	set fontVariant(value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get fontStyle() {
		return this._fontStyle;
	}

	set fontStyle(value) {
		if (this._fontStyle !== value) {
			this._fontStyle = value;
			this._textWidthInPixels = undefined;
			this.redraw();
		}
	}

	get font() {
		return CSS_font(
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			this.fontSize,
			this.fontFamily,
		);
	}

	get fillStyle() {
		return this._fillStyle;
	}

	set fillStyle(value) {
		if (this._fillStyle !== value) {
			this._fillStyle = value;
			this.redraw();
		}
	}

	get strokeWidth() {
		return this._strokeWidth;
	}

	set strokeWidth(value) {
		if (this._strokeWidth !== value) {
			this._strokeWidth = value;
			this.redraw();
		}
	}

	get strokeWidthInPixels() {
		return this._strokeWidth * this.fontSize;
	}

	get strokeStyle() {
		return this._strokeStyle;
	}

	set strokeStyle(value) {
		if (this._strokeStyle !== value) {
			this._strokeStyle = value;
			this.redraw();
		}
	}

	get align() {
		return this._align;
	}

	set align(value) {
		if (this._align !== value) {
			this._align = value;
			this.redraw();
		}
	}

	get lineGap() {
		return this._lineGap;
	}

	set lineGap(value) {
		if (this._lineGap !== value) {
			this._lineGap = value;
			this.redraw();
		}
	}

	get lineGapInPixels() {
		return this.fontSize * this.lineGap;
	}

	get padding() {
		return this._padding;
	}

	set padding(value) {
		if (this._padding !== value) {
			this._padding = value;
			this.redraw();
		}
	}

	get paddingInPixels() {
		return this.padding * this.fontSize;
	}

	get textWidthInPixels() {
		if (Object_isUndefined(this._textWidthInPixels)) {
			this._textWidthInPixels = this.computeTextWidthInPixels();
		}
		return this._textWidthInPixels;
	}

	computeTextWidthInPixels() {
		let {
			createCanvas,
			font,
			lines,
		} = this;
		if (lines.length) {
			let context = createCanvas().getContext('2d');
			context.font = font;
			return Array_max(lines.map(text => context.measureText(text).width));
		}
		return 0;
	}

	get textHeight() {
		let {
			lineGap,
			lines,
		} = this;
		return (lines.length
			? lines.length + lineGap * (lines.length - 1)
			: 0
		);
	}

	get textHeightInPixels() {
		return this.textHeight * this.fontSize;
	}

	get widthInPixels() {
		return this.textWidthInPixels + this.strokeWidthInPixels + this.paddingInPixels * 2;
	}

	get height() {
		return this.textHeight + this.strokeWidth + this.padding * 2;
	}

	get heightInPixels() {
		return this.height * this.fontSize;
	}

	redraw() {
		console.log('redraw');
		return Promise
			.resolve()
			.then(() => {
				let {
					align,
					fillStyle,
					font,
					fontFamily,
					fontSize,
					fontStyle,
					fontVariant,
					fontWeight,
					heightInPixels,
					image,
					lineGapInPixels,
					lines,
					paddingInPixels,
					strokeStyle,
					strokeWidthInPixels,
					textWidthInPixels,
					widthInPixels,
				} = this;
				console.log({
					align,
					fillStyle,
					font,
					fontFamily,
					fontSize,
					fontStyle,
					fontVariant,
					fontWeight,
					heightInPixels,
					image,
					lineGapInPixels,
					lines,
					paddingInPixels,
					strokeStyle,
					strokeWidthInPixels,
					textWidthInPixels,
					widthInPixels,
				});
				return Promise
					.resolve()
					.then(() => this.loadFontFace(
						fontFamily,
						fontStyle,
						fontVariant,
						fontWeight,
					))
					.then(() => {
						let context = image.getContext('2d');
						context.clearRect(0, 0, image.width, image.height);
						if (widthInPixels && heightInPixels) {
							image.width = widthInPixels;
							image.height = heightInPixels;
							context.font = font;
							context.textBaseline = 'middle';
							let left;
							switch (align) {
								case 'left':
									context.textAlign = 'left';
									left = paddingInPixels + strokeWidthInPixels / 2;
									break;
								case 'right':
									context.textAlign = 'right';
									left = paddingInPixels + strokeWidthInPixels / 2 + textWidthInPixels;
									break;
								case 'center':
									context.textAlign = 'center';
									left = paddingInPixels + strokeWidthInPixels / 2 + textWidthInPixels / 2;
									break;
							}
							let top = paddingInPixels + strokeWidthInPixels / 2 + fontSize / 2;
							context.fillStyle = fillStyle;
							context.miterLimit = 1;
							context.lineWidth = strokeWidthInPixels;
							context.strokeStyle = strokeStyle;
							lines.forEach(text => {
								if (strokeWidthInPixels) {
									context.strokeText(text, left, top);
								}
								context.fillText(text, left, top);
								top += fontSize + lineGapInPixels;
							});
						} else {
							image.width = image.height = 1;
						}
						this.needsUpdate = true;
					});
			});
	}
}
