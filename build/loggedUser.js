"use strict";
window.addEventListener("load", (e) => {
    let user = sessionStorage.getItem("userLogged");
    if (user === null) {
        window.location.replace("/index.html");
    }
    else {
        let arrayUser = user.split(":");
        let username = arrayUser[0];
        console.log(username);
        fetch(`http://localhost:3000/users?username=${username}`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
            if (data.length !== 0) {
                let getId, getUser, getPass, getEmail, getSub, getScore, getFriends;
                console.log("User found!");
                for (let i = 0; i < data.length; i++) {
                    getId = data[i].id;
                    getUser = data[i].username;
                    getPass = data[i].password;
                    getEmail = data[i].email;
                    getSub = data[i].subscription;
                    getScore = data[i].score;
                    getFriends = data[i].friends;
                }
                const userPos = document.getElementById("username");
                const emailPos = document.getElementById("email");
                const passwordPos = document.getElementById("password");
                const subPos = document.getElementById("news");
                const scorePos = document.getElementById("score");
                if (userPos !== null &&
                    emailPos !== null &&
                    passwordPos !== null &&
                    subPos !== null &&
                    scorePos !== null) {
                    userPos.innerHTML = getUser;
                    console.log(getUser);
                    emailPos.innerHTML = getEmail;
                    console.log(getEmail);
                    passwordPos.innerHTML = getPass;
                    console.log(getPass);
                    subPos.innerHTML = getSub;
                    console.log(getSub);
                    scorePos.innerHTML = getScore;
                    console.log(getScore);
                }
            }
        }
        function responseKO(err) {
            alert(err.message);
        }
    }
});
