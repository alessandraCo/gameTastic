"use strict";
//Controller of responsive design
const toggle = document.getElementById("toggle");
const profile = document.getElementById("user");
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
profile === null || profile === void 0 ? void 0 : profile.addEventListener("click", (e) => {
    e.preventDefault();
    const container = document.getElementById("dropdown-profile");
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
