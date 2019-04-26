export default function(array) {
	return array.reduce((a, n) => Math.max(a, n));
}
