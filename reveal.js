// Fades case-study content in as it scrolls into view. Elements that enter
// together (e.g. a heading, its text and the image beside it) are staggered
// in reading order so they don't all pop at once. The hidden starting state
// lives in style.css under .js-reveal, which the page's <head> sets.
(function () {
    var root = document.documentElement;
    if (!root.classList.contains('js-reveal')) return;
    if (!('IntersectionObserver' in window)) {
        root.classList.remove('js-reveal');
        return;
    }

    // Keep in sync with the .js-reveal selectors in style.css
    var targets = document.querySelectorAll(
        '.case-hero > *, .case-section :is(.eyebrow, h2, h4, p.prose, .prose-list > li, .pull-quote, .figure), .case-nav'
    );

    var observer = new IntersectionObserver(function (entries) {
        var step = 0;
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            el.style.setProperty('--reveal-delay', Math.min(step, 5) * 90 + 'ms');
            el.classList.add('is-revealed');
            observer.unobserve(el);
            step++;
        });
    }, { rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) { observer.observe(el); });
})();
