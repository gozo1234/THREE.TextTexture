import Function_noop from '../Function/noop';

export default function(func, delay = 0, leading = false) {
	let resolveDelay = Function_noop;
	let flushed;
	let cancelled;
	let promise;
	let lastThis;
	let lastArgs;
	let invokeFunc = (() => {
		if (!cancelled) {
			return func.apply(lastThis, lastArgs);
		}
	});
	let invokeDelay = (() => new Promise(resolve => {
		if (flushed || cancelled) {
			resolve();
		} else {
			resolveDelay = resolve;
			setTimeout(resolve, delay);
		}
	}));
	return Object.assign(function(...args) {
		lastThis = this;
		lastArgs = args;
		if (!promise) {
			flushed = false;
			cancelled = false;
			if (leading) {
				promise = Promise
					.resolve()
					.then(invokeFunc);
				promise
					.finally(invokeDelay)
					.finally(() => {
						promise = undefined;
					});
			} else {
				promise = Promise
					.resolve()
					.finally(invokeDelay)
					.then(invokeFunc);
				promise
					.finally(() => {
						promise = undefined;
					});
			}
		}
		return promise;
	}, {
		flush() {
			flushed = true;
			resolveDelay();
		},
		cancel() {
			cancelled = true;
			resolveDelay();
		},
	});
}
