// Lazy load images using Intersection Observer API
if ('IntersectionObserver' in window) {
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				if (img.dataset.backgroundImage) {
					img.style.backgroundImage = `url('${img.dataset.backgroundImage}')`;
					img.classList.add('loaded');
				} else if (img.dataset.src) {
					img.src = img.dataset.src;
					img.classList.add('loaded');
				}
				observer.unobserve(img);
			}
		});
	}, {
		rootMargin: '50px' // Start loading 50px before image enters viewport
	});

	// Observe all elements with data-background-image or data-src
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('[data-background-image], [data-src]').forEach(img => {
			imageObserver.observe(img);
		});
	});
} else {
	// Fallback for browsers without IntersectionObserver
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('[data-background-image]').forEach(el => {
			el.style.backgroundImage = `url('${el.dataset.backgroundImage}')`;
		});
		document.querySelectorAll('[data-src]').forEach(img => {
			img.src = img.dataset.src;
		});
	});
}
