import * as THREE from 'three';

import Document_createCanvas from './utils/Document/createCanvas';
import Lang_isUndefined from './utils/Lang/isUndefined';

import getFont from './getFont';
import getLines from './getLines';
import getTextWidth from './getTextWidth';

export default class extends THREE.Texture {
	constructor({
		anisotropy,
		autoRedraw = true,
		fillStyle = '#fff',
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontStyle = 'normal',
		fontVariant = 'normal',
		fontWeight = 'normal',
		format,
		magFilter = THREE.LinearFilter,
		mapping,
		minFilter = THREE.LinearFilter,
		padding = 0.25,
		strokeStyle = '#000',
		strokeWidth = 0,
		text = '',
		align = 'center',
		textLineHeight = 1.15,
		type,
		wrapS,
		wrapT,
	} = {}) {
		super(
			Document_createCanvas(),
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy,
		);
		this.autoRedraw = autoRedraw;
		this._fillStyle = fillStyle;
		this._fontFamily = fontFamily;
		this._fontSize = fontSize;
		this._fontStyle = fontStyle;
		this._fontVariant = fontVariant;
		this._fontWeight = fontWeight;
		this._padding = padding;
		this._strokeStyle = strokeStyle;
		this._strokeWidth = strokeWidth;
		this._text = text;
		this._align = align;
		this._textLineHeight = textLineHeight;
		this.redraw();
	}

	redraw() {
		let ctx = this.image.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (this.textWidthInPixels && this.textHeightInPixels) {
			ctx.canvas.width = this.widthInPixels;
			ctx.canvas.height = this.heightInPixels;
			ctx.font = this.font;
			ctx.textBaseline = 'middle';
			let left;
			switch (this.align) {
				case 'left':
					ctx.textAlign = 'left';
					left = this.paddingInPixels + this.strokeWidthInPixels / 2;
					break;
				case 'right':
					ctx.textAlign = 'right';
					left = this.paddingInPixels + this.strokeWidthInPixels / 2 + this.textWidthInPixels;
					break;
				case 'center':
					ctx.textAlign = 'center';
					left = this.paddingInPixels + this.strokeWidthInPixels / 4 + this.textWidthInPixels / 2;
					break;
			}
			let top = this.paddingInPixels + this.strokeWidthInPixels / 2 + this.fontSize / 2;
			ctx.fillStyle = this.fillStyle;
			ctx.miterLimit = 1;
			ctx.lineWidth = this.strokeWidthInPixels;
			ctx.strokeStyle = this.strokeStyle;
			this.lines.forEach(text => {
				if (this.strokeWidth) {
					ctx.strokeText(text, left, top);
				}
				ctx.fillText(text, left, top);
				top += this.textLineHeightInPixels;
			});
		} else {
			ctx.canvas.width = ctx.canvas.height = 1;
		}
		this.needsUpdate = true;
	}

	_redrawIfAuto() {
		if (this.autoRedraw) {
			this.redraw();
		}
	}

	get text() {
		return this._text;
	}

	set text(value) {
		if (this._text !== value) {
			this._text = value;
			this._lines = undefined;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get align() {
		return this._align;
	}

	set align(value) {
		if (this._align !== value) {
			this._align = value;
			this._redrawIfAuto();
		}
	}

	get lines() {
		if (Lang_isUndefined(this._lines)) {
			this._lines = getLines(this.text);
		}
		return this._lines;
	}

	get textLineHeight() {
		return this._textLineHeight;
	}

	set textLineHeight(value) {
		if (this._textLineHeight !== value) {
			this._textLineHeight = value;
			this._redrawIfAuto();
		}
	}

	get textLineHeightInPixels() {
		return this.fontSize * this.textLineHeight;
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set fontFamily(value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontWeight() {
		return this._fontWeight;
	}

	set fontWeight(value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontVariant() {
		return this._fontVariant;
	}

	set fontVariant(value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontStyle() {
		return this._fontStyle;
	}

	set fontStyle(value) {
		if (this._fontStyle !== value) {
			this._fontStyle = value;
			this._textWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get font() {
		return getFont(
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
			this._redrawIfAuto();
		}
	}

	get strokeWidth() {
		return this._strokeWidth;
	}

	set strokeWidth(value) {
		if (this._strokeWidth !== value) {
			this._strokeWidth = value;
			this._redrawIfAuto();
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
			this._redrawIfAuto();
		}
	}

	get textWidthInPixels() {
		if (Lang_isUndefined(this._textWidthInPixels)) {
			this._textWidthInPixels = getTextWidth(
				this.lines,
				this.font,
			);
		}
		return this._textWidthInPixels;
	}

	get textHeight() {
		return this.textLineHeight * (this.lines.length - 1) + 1;
	}

	get textHeightInPixels() {
		return this.textHeight * this.fontSize;
	}

	get padding() {
		return this._padding;
	}

	set padding(value) {
		if (this._padding !== value) {
			this._padding = value;
			this._redrawIfAuto();
		}
	}

	get paddingInPixels() {
		return this.padding * this.fontSize;
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

	get aspect() {
		if (this.widthInPixels && this.heightInPixels) {
			return this.widthInPixels / this.heightInPixels;
		}
		return 1;
	}
}
