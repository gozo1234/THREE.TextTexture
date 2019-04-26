import Array_max from './utils/Array/max';

export default function(createCanvas, lines, font) {
	if (lines.length) {
		let ctx = createCanvas().getContext('2d');
		ctx.font = font;
		return Array_max(lines.map(text => ctx.measureText(text).width));
	}
	return 0;
}
