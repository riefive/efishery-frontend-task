let timer = null
export function debounce(functional, timeout = 300) {
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			functional.apply(this, args)
		}, timeout)
	}
}
