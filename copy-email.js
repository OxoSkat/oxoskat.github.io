// Email links also copy the address and confirm it with a small toast.
// mailto: only works if the visitor has a desktop mail app set up — people on
// webmail (Gmail etc.) often get nothing — so this way they always leave with
// the address. The link isn't blocked, so a configured mail app still opens.
(function () {
    var toast, hideTimer;

    function copy(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return legacyCopy(text);
            });
        }
        return legacyCopy(text);
    }

    // For http://, older browsers, or when the Clipboard API is refused
    function legacyCopy(text) {
        return new Promise(function (resolve, reject) {
            var field = document.createElement("textarea");
            field.value = text;
            field.setAttribute("readonly", "");
            field.style.position = "fixed";
            field.style.opacity = "0";
            document.body.appendChild(field);
            field.select();
            var ok = false;
            try { ok = document.execCommand("copy"); } catch (e) {}
            field.remove();
            ok ? resolve() : reject();
        });
    }

    function showToast(address) {
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        var da = document.documentElement.getAttribute("data-lang") === "da";
        toast.innerHTML = "";
        var label = document.createElement("span");
        label.className = "toast-label";
        label.textContent = da ? "Email kopieret" : "Email copied";
        var value = document.createElement("span");
        value.textContent = address;
        toast.append(label, value);

        clearTimeout(hideTimer);
        // Restart the entrance even if it's already showing
        toast.classList.remove("is-visible");
        void toast.offsetWidth;
        toast.classList.add("is-visible");
        hideTimer = setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 3200);
    }

    document.addEventListener("click", function (e) {
        var link = e.target.closest('a[href^="mailto:"]');
        if (!link) return;
        var address = decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]);
        copy(address).then(function () { showToast(address); }, function () {});
    });
})();
