(function() {

	new Vue({
		el: '#app',
		data: {
			drawer: true,
			fillStyle: '#e59500',
			fontSizeIndex: 3,
			fontSizeValues: [
				0,
				8,
				16,
				32,
				64,
			],
			fontStyleIndex: 0,
			fontStyleValues: [
				'normal',
				'italic',
			],
			fontVariantIndex: 0,
			fontVariantValues: [
				'normal',
				'small-caps',
			],
			fontWeightIndex: 0,
			fontWeightValues: [
				'normal',
				'bold',
			],
			strokeWidthIndex: 0,
			strokeWidthValues: [
				0,
				0.5,
				1,
				2,
			],
			text: [
				'Twinkle, twinkle, little star,',
				'How I wonder what you are!',
				'Up above the world so high,',
				'Like a diamond in the sky.',
			].join('\n'),
		},
		computed: {
			fontStyleOptions: function() {
				return this.fontStyleValues.map(function(label, value) {
					return {
						label: label,
						value: value,
					};
				});
			},
			fontStyle: function() {
				return this.fontStyleValues[this.fontStyleIndex];
			},
			fontVariantOptions: function() {
				return this.fontVariantValues.map(function(label, value) {
					return {
						label: label,
						value: value,
					};
				});
			},
			fontVariant: function() {
				return this.fontVariantValues[this.fontVariantIndex];
			},
			fontWeightOptions: function() {
				return this.fontWeightValues.map(function(label, value) {
					return {
						label: label,
						value: value,
					};
				});
			},
			fontWeight: function() {
				return this.fontWeightValues[this.fontWeightIndex];
			},
			fontSize: function() {
				return this.fontSizeValues[this.fontSizeIndex];
			},
			strokeWidth: function() {
				return this.strokeWidthValues[this.strokeWidthIndex];
			},
		},
	});

})();
