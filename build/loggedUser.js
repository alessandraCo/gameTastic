"use strict";
//imports
import { User } from "./user.js";

//export
export let LOGGED = new User();

window.addEventListener("load", (e) => {
    const id = sessionStorage.getItem("userId");
    let user = sessionStorage.getItem("userLogged");
    if (user === null) {
        window.location.replace("/index.html");
    }
    else {
        let arrayUser = user.split(":");
        let username = arrayUser[0];
        console.log(username);
        const userMenu = document.getElementById("user");
        if (userMenu !== null) {
            userMenu.innerHTML = username;
        }
        fetch(`http://localhost:3000/users?username=${username}`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
            if (data.length !== 0) {
                let getId, getUser, getPass, getEmail, getSub, getAdmin, getScore, getFriends;
                console.log("User found!");
                for (let i = 0; i < data.length; i++) {
                    getId = data[i].id;
                    getUser = data[i].username;
                    getPass = data[i].password;
                    getEmail = data[i].email;
                    getAdmin = data[i].isAdmin;
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
                    emailPos.innerHTML = getEmail;
                    passwordPos.innerHTML = getPass;
                    getSub ? subPos.innerHTML = "yes" : subPos.innerHTML = "no";
                    scorePos.innerHTML = getScore;

                }
                let user = new User();
                LOGGED = user.getUser(getId, getUser, getEmail, getPass, getSub, getAdmin, getFriends, getScore);
                const tableFriend = document.getElementById("friends-table");
                if (getFriends.length === 0) {
                    tableFriend.style.display = "none";
                    document.getElementById("send-button").style.display = "none";
                } else if (tableFriend !== null){
                    tableFriend.style.display = "table";
                    document.getElementById("send-button").style.display = "inline-block";
                    const tableBody = document.getElementById("tbody");
                    console.log(getFriends);
                    for (let i = 0; i < getFriends.length; i++) {
                        const newRow = document.createElement("tr");
                        const newData = document.createElement("td");
                        newData.innerHTML = getFriends[i];
                        const newDiv = document.createElement("div");
                        newDiv.style.display = "flex";
                        newDiv.style.height = "32px"
                        newDiv.style.justifyContent = "center";
                        newDiv.style.alignItems = "center";
                        const newCheck = document.createElement("input");
                        newCheck.value = getFriends[i];
                        newCheck.setAttribute("type", "checkbox");
                        newCheck.setAttribute("class", "checkbox");
                        newRow.appendChild(newData);
                        newDiv.appendChild(newCheck);
                        newRow.appendChild(newDiv);
                        tableBody.appendChild(newRow);
                    }
                }
            }
        }
        function responseKO(err) {
            alert(err.message);
        }
    }
});
