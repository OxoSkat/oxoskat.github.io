(function () {
    // Scroll distance (px) over which the loop runs from step 1 to "round 2".
    // Short enough that every step lights up while the graphic is still on screen.
    var SCROLL_RANGE = 160;

    var COPY = {
        en: {
            round: "ROUND",
            steps: ["Understand users", "Frame the problem", "Sketch & prototype", "Test with users"],
            repeat: "Learn & repeat"
        },
        da: {
            round: "RUNDE",
            steps: ["Forstå brugerne", "Definér problemet", "Skitsér & prototype", "Test med brugere"],
            repeat: "Lær & gentag"
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        var svg = document.getElementById("heroLoop");
        if (!svg) return;

        var progress = svg.querySelector(".loop-progress");
        var nodes = svg.querySelectorAll(".loop-node");
        var labels = svg.querySelectorAll(".loop-label");
        var roundEl = svg.querySelector(".loop-round");
        var stepEl = svg.querySelector(".loop-step");
        var labelEn = svg.getAttribute("aria-label");
        var ticking = false;

        function lang() {
            return document.documentElement.getAttribute("data-lang") === "da" ? "da" : "en";
        }

        function render() {
            ticking = false;
            var p = Math.max(0, Math.min(1, window.scrollY / SCROLL_RANGE));
            var wrapped = p >= 0.98;
            var current = wrapped ? 0 : Math.min(3, Math.floor(p * 4));
            var copy = COPY[lang()];

            progress.style.strokeDashoffset = (1 - p).toFixed(4);

            for (var i = 0; i < nodes.length; i++) {
                var isCurrent = i === current;
                var isDone = !isCurrent && (wrapped || i < current);
                nodes[i].classList.toggle("is-current", isCurrent);
                nodes[i].classList.toggle("is-done", isDone);
                labels[i].classList.toggle("is-reached", isCurrent || isDone);
            }

            roundEl.textContent = copy.round + " " + (wrapped ? 2 : 1);
            stepEl.textContent = wrapped ? copy.repeat : copy.steps[current];
            svg.setAttribute("aria-label", lang() === "da" ? svg.getAttribute("data-label-da") : labelEn);
        }

        function schedule() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(render);
            }
        }

        window.addEventListener("scroll", schedule, { passive: true });

        // Re-render the centre text when the EN/DA toggle flips data-lang
        new MutationObserver(render).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-lang"]
        });

        render();
    });
})();
