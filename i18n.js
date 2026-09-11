(function () {
    var STORAGE_KEY = "oxoskat-lang";

    function currentLang() {
        try {
            return localStorage.getItem(STORAGE_KEY) || "en";
        } catch (e) {
            return "en";
        }
    }

    function swapAttrs(lang) {
        document.querySelectorAll("[data-alt-da]").forEach(function (el) {
            if (!el.dataset.altEn) {
                el.dataset.altEn = el.getAttribute("alt") || "";
            }
            el.setAttribute("alt", lang === "da" ? el.dataset.altDa : el.dataset.altEn);
        });

        var titleDa = document.body.getAttribute("data-title-da");
        if (titleDa) {
            if (!document.body.getAttribute("data-title-en")) {
                document.body.setAttribute("data-title-en", document.title);
            }
            document.title = lang === "da" ? titleDa : document.body.getAttribute("data-title-en");
        }
    }

    function setActiveButtons(lang) {
        document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
            var active = btn.getAttribute("data-lang-btn") === lang;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    function applyLang(lang) {
        document.documentElement.setAttribute("data-lang", lang);
        document.documentElement.setAttribute("lang", lang);
        swapAttrs(lang);
        setActiveButtons(lang);
    }

    window.setLang = function (lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
        applyLang(lang);
    };

    document.addEventListener("DOMContentLoaded", function () {
        applyLang(currentLang());
    });
})();
