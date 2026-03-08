// Lazy load images using Intersection Observer API
if ('IntersectionObserver' in window) {
	var imageObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				var img = entry.target;
				if (img.dataset.backgroundImage) {
					img.style.backgroundImage = "url('" + img.dataset.backgroundImage + "')";
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

	function initLazyLoad() {
		document.querySelectorAll('[data-background-image], [data-src]').forEach(function (el) {
			imageObserver.observe(el);
		});
	}
	// Run when DOM is ready; if already loaded (e.g. script at end of body on fast desktop), run immediately
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initLazyLoad);
	} else {
		initLazyLoad();
	}
} else {
	// Fallback for browsers without IntersectionObserver
	function initFallback() {
		document.querySelectorAll('[data-background-image]').forEach(function (el) {
			el.style.backgroundImage = "url('" + el.dataset.backgroundImage + "')";
		});
		document.querySelectorAll('[data-src]').forEach(function (img) {
			img.src = img.dataset.src;
		});
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initFallback);
	} else {
		initFallback();
	}
}
