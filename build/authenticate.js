"use strict";
//imports
import { User } from "./user.js";
//authentication using json-server
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
//Session
let userLogged = null;
window.addEventListener("load", () => {
    sessionStorage.setItem("userLogged", "null");
    userLogged = null;
});

//login
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", (e) => {
    var _a, _b;
    //e.preventDefault();
    const inputUser = (_a = document.getElementById("username")) === null || _a === void 0 ? void 0 : _a.value;
    const inputPassword = (_b = document.getElementById("password")) === null || _b === void 0 ? void 0 : _b.value;
    if (inputUser != null &&
        inputUser.trim() !== "" &&
        inputPassword != null &&
        inputPassword !== "") {
        //Session
        let userLogged = null;
        sessionStorage.setItem("userLogged", "null");
        e.preventDefault();
        //serching for username in db
        fetch(`http://localhost:3000/users?username=${inputUser}`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
            //HTML manager:
            //success message
            const msg = document.getElementById("successMsg");
            if (msg !== null && msg != undefined) {
                msg.innerText = "";
            }
            //error message
            const errorMsg = document.getElementById("errorMsg");
            if (errorMsg !== null && errorMsg != undefined) {
                errorMsg.innerText = "";
            }
            //username present in db
            if (data.length !== 0) {
                let getId, getUser, getPass, getEmail, getSub, getAdmin;
                console.log("User found!");
                for (let i = 0; i < data.length; i++) {
                    getId = data[i].id;
                    getUser = data[i].username;
                    getPass = data[i].password;
                    getEmail = data[i].email;
                    getSub = data[i].subscription;
                    getAdmin = data[i].isAdmin;
                }
                const user = new User(getUser, getEmail, getPass, getSub, getAdmin);
                if (user !== undefined) {
                    //check password
                    if (user.getPassword() === inputPassword) {
                        if (msg !== null && msg != undefined) {
                            msg.innerText = "Welcome! You logged in!"; //passwordOK
                        }
                        userLogged = user.getUsername() + ":";
                        //generating token for authentication
                        let token = new Int8Array(5);
                        self.crypto.getRandomValues(token);
                        for (let n of token) {
                            userLogged = userLogged.concat(n.toString());
                        }
                        //session
                        sessionStorage.setItem("userLogged", userLogged); //session: userLogged = username + token
                        //redirecting to the right secondary menu depending on common user or admin
                        if (user.getIsAdmin()) {
                            window.location.replace("/index-admin.html"); //admin
                        }
                        else {
                            window.location.replace("/index-logged.html"); //common user
                        }
                        return;
                    }
                    else {
                        if (errorMsg !== null && errorMsg != undefined) {
                            errorMsg.innerText = "Incorrect username or password"; //passwordKO
                        }
                        return;
                    }
                }
                else {
                    if (errorMsg !== null && errorMsg != undefined) {
                        errorMsg.innerText = "User not present";
                        return;
                    }
                }
            }
            //username not present in db
            else {
                console.log("User NOT found");
                if (errorMsg !== null && errorMsg != undefined) {
                    errorMsg.innerText = "User not present";
                }
                return undefined;
            }
        }
        function responseKO(err) {
            alert(err.message);
        }
    }
});
//registration
registerButton === null || registerButton === void 0 ? void 0 : registerButton.addEventListener("click", (e) => {
    var _a, _b, _c, _d;
    const msg = document.getElementById("errorMsg");
    if (msg !== undefined && msg !== null) {
        e.preventDefault();
        msg.innerText = "";
    }
    //retrieving the form fields
    const inputUser = (_a = ((document.getElementById("usernameIn")))) === null || _a === void 0 ? void 0 : _a.value;
    const inputPassword = (_b = ((document.getElementById("passwordIn")))) === null || _b === void 0 ? void 0 : _b.value;
    const inputEmail = (_c = ((document.getElementById("email")))) === null || _c === void 0 ? void 0 : _c.value;
    const inputNews = (_d = ((document.getElementById("newsletter")))) === null || _d === void 0 ? void 0 : _d.checked;
    //checking user input: not null and not empty
    if (inputUser !== null &&
        inputUser !== "" &&
        inputPassword !== null &&
        inputPassword !== "" &&
        inputEmail !== null &&
        inputEmail !== "" &&
        checkMail(inputEmail) //validate email with regex
    ) {
        const newUser = new User(inputUser.trim(), inputEmail, inputPassword, inputNews || false, false);
        const opts = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        };
        const pr1 = fetch("http://localhost:3000/users", opts);
        const pr2 = pr1.then(convertiJson);
        pr2.then(responseOK, responseKO);
    }
    //first callback: from json to typescript obj
    function convertiJson(response) {
        return response.json();
    }
    //second callback:
    //responseOK: registration success
    function responseOK() {
        const message = "You registered in! Try to login!";
        alert(message);
    }
    //responseKO: registration failed
    function responseKO(err) {
        alert(err.message);
    }
});
//check mail using regex expression
function checkMail(email) {
    //HTML manager
    const msg = document.getElementById("errorMsg");
    if (msg !== undefined && msg !== null) {
        msg.innerText = "";
    }
    let mailRegex = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
    const check = email.match(mailRegex);
    if (check) {
        return true;
    }
    else {
        console.log("This email is not valid and will not be registered");
        if (msg !== undefined && msg !== null) {
            msg.innerText = "This email is not valid and will not be registered";
        }
        return false;
    }
}
