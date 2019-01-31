export default function(func, wait) {
	var timeoutId;
	return function() {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func.bind(this), wait);
	};
}
