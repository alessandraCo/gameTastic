//Controller of responsive design
const toggle = document.getElementById("toggle");
const profile = document.getElementById("user");

toggle?.addEventListener("click", (e)=> {
    e.preventDefault();
    const container = document.getElementById("small-menu-container");
    if (container !== null) {
        const display = window.getComputedStyle(container).display;
        if(display === "flex") {
            container.style.display = "none";
        } else if(display === "none") {
            container.style.display = "flex";
        }
    }
});

profile?.addEventListener("click", (e) => {
    e.preventDefault();
    const container = document.getElementById("dropdown-profile");
    if (container !== null) {
        const display = window.getComputedStyle(container).display;
        if(display === "flex") {
            container.style.display = "none";
        } else if(display === "none") {
            container.style.display = "flex";
        }
    }
});



