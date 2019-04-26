export default function(func) {
	let promise;
	return function(...args) {
		if (!promise) {
			promise = new Promise(resolve => {
				setTimeout(resolve, 0);
			})
				.then(() => func.apply(this, args))
				.finally(() => {
					promise = undefined;
				});
		}
		return promise;
	};
}
