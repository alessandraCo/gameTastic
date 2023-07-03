"use strict";
//authentication using json-server
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
//User
class User {
    constructor(username, email, password, subscription, authorization = false) {
        //this.id = User.idAll;
        this.username = username;
        this.email = email;
        this.password = password;
        this.subscription = subscription;
        this.isAdmin = authorization;
        this.friends = [];
        //User.idAll++;
    }
    // public getId(): number {
    //   return this.id;
    // }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getSubscription() {
        return this.subscription;
    }
    getIsAdmin() {
        return this.isAdmin;
    }
    changeUsername(newUsername) {
        this.username = newUsername;
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
    changeEmail(newEmail) {
        this.email = checkMail(newEmail);
    }
    changeSubscription(newSubscription) {
        this.subscription = newSubscription;
    }
    setAdministration(isAdmin) {
        this.isAdmin = isAdmin;
    }
    printUser() {
        // console.log("| id utente: | " + this.id);
        console.log("| username:  | " + this.username);
        console.log("| email:     | " + this.email);
        this.subscription
            ? console.log("| newsletter:| yes")
            : console.log("| newsletter:| no");
    }
}
//login
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", (e) => {
    var _a, _b;
    e.preventDefault();
    const inputUser = (_a = document.getElementById("username")) === null || _a === void 0 ? void 0 : _a.value;
    const inputPassword = (_b = document.getElementById("password")) === null || _b === void 0 ? void 0 : _b.value;
    if (inputUser != null &&
        inputUser.trim() !== "" &&
        inputPassword != null &&
        inputPassword !== "") {
        e.preventDefault();
        //serching for username in db
        const loginUser = fetch(`http://localhost:3000/users?username=${inputUser}`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
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
                        const msg = document.getElementById("successMsg");
                        if (msg !== null && msg != undefined) {
                            msg.innerText = "Welcome! You logged in!"; //passwordOK
                        }
                    }
                    else {
                        const errorMsg = document.getElementById("errorMsg");
                        if (errorMsg !== null && errorMsg != undefined) {
                            errorMsg.innerText = "Incorrect username or password"; //passwordKO
                        }
                    }
                }
                else {
                    const errorMsg = document.getElementById("errorMsg");
                    if (errorMsg !== null && errorMsg != undefined) {
                        errorMsg.innerText = "User not present";
                        return;
                    }
                }
            }
            //username not present in db
            else {
                console.log("User NOT found");
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
    const inputUser = (_a = ((document.getElementById("usernameIn")))) === null || _a === void 0 ? void 0 : _a.value;
    const inputPassword = (_b = ((document.getElementById("passwordIn")))) === null || _b === void 0 ? void 0 : _b.value;
    const inputEmail = (_c = ((document.getElementById("email")))) === null || _c === void 0 ? void 0 : _c.value;
    const inputNews = (_d = ((document.getElementById("newsletter")))) === null || _d === void 0 ? void 0 : _d.checked;
    if (inputUser !== null &&
        inputUser !== "" &&
        inputPassword !== null &&
        inputPassword !== "" &&
        inputEmail !== null &&
        inputEmail !== "") {
        const newUser = new User(inputUser.trim(), checkMail(inputEmail), inputPassword, inputNews || false, false);
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
        return email;
    }
    else {
        console.log("This email is not valid and will not be registered. You can modify your email later");
        if (msg !== undefined && msg !== null) {
            msg.innerText =
                "This email is not valid and will not be registered. You can modify your email later";
        }
        return undefined;
    }
}
