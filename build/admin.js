"use strict";
window.addEventListener("load", (e) => {
    let user = sessionStorage.getItem("userLogged");
    if (user === null) {
        window.location.replace('/index.html');
    }
    else {
        let arrayUser = user.split(':');
        let username = arrayUser[0];
    }
});
