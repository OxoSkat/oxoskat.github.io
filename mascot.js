(function () {
    var mascot = document.getElementById("mascot");
    if (!mascot) return;

    var pupils = mascot.querySelectorAll(".mascot-pupil");
    var ducked = false;

    function onMove(e) {
        var rect = mascot.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height * 0.55;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var reach = Math.min(2.8, dist / 16);
        var ex = (dx / dist) * reach;
        var ey = (dy / dist) * reach;
        var t = "translate(" + ex.toFixed(1) + "px," + ey.toFixed(1) + "px)";
        pupils.forEach(function (p) { p.style.transform = t; });
    }

    function onScroll() {
        var shouldDuck = window.scrollY > 4;
        if (shouldDuck !== ducked) {
            ducked = shouldDuck;
            mascot.classList.toggle("is-ducked", ducked);
        }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
})();
