import {terser} from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';

import {main} from './package.json';

let globals = {
	'three': 'THREE',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins: [
		buble(),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'THREE.TextTexture',
		globals,
	},
};
