"use strict";
//Controller of responsive design
const toggle = document.getElementById("toggle");
toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const container = document.getElementById("small-menu-container");
    if (container !== null) {
        const display = window.getComputedStyle(container).display;
        if (display === "flex") {
            container.style.display = "none";
        }
        else if (display === "none") {
            container.style.display = "flex";
        }
    }
});
