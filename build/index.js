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

//carousel
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("carousel");
    for (i=0; i<slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000);   //change image every 2 seconds
}
