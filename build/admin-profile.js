//imports
import { User } from "./user.js";
import { LOGGED } from "./loggedUser.js";
import { sendMail } from "./email.js";

//newsletter
const sendNewsButton = document.getElementById("send-news");
const newsletterText = document.getElementById("newsletter");

sendNewsButton.addEventListener("click", (e) => {
    console.log(newsletterText.value);
    //check valid input
    if (newsletterText.value === null || newsletterText.value === "") {
        console.log("empty field");
        return;
    } else {
        console.log("sending news");
        //getting users subscribed to newsletter
        fetch(`http://localhost:3000/users?subscription=true`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
            if (data.length !== 0) {
                let getUser, getEmail;
                for (let i = 0; i < data.length; i++) {
                    getUser = data[i].username;
                    getEmail = data[i].email;
                    let userSubbed = new User();
                    userSubbed.username = getUser;
                    userSubbed.email = getEmail;
                    sendMail(LOGGED.username, userSubbed.username, LOGGED.email, userSubbed.email, newsletterText.value);
                }
                //reset values:
                newsletterText.value = "";
                return;
            }
        }
        function responseKO(err) {
            alert(err.message);
        }
    }
});

//change to admin
const turnAdminButton = document.getElementById("turn-admin-button");
const searchUsername = document.getElementById("searchUsername");

turnAdminButton.addEventListener("click", (e) => {
    //empty field
    if (searchUsername.value === "" || searchUsername.value === null || searchUsername.value === undefined) {
        return;
    } else {
        const username = searchUsername.value;
        fetch(`http://localhost:3000/users?username=${username}`)
            .then((response) => response.json())
            .then(responseOK);
        function responseOK(data) {
            if (data.length !== 0) {
                let newAdmin = new User();
                for (let i = 0; i < data.length; i++) {
                    newAdmin.id = data[i].id;
                    newAdmin.username = data[i].username;
                    newAdmin.password = data[i].password;
                    newAdmin.email = data[i].email;
                    newAdmin.isAdmin = true;
                    newAdmin.subscription = data[i].subscription;
                    newAdmin.score = data[i].score;
                    newAdmin.friends = data[i].friends;
                }
                const opts = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(newAdmin)
                };
                fetch(`http://localhost:3000/users/${newAdmin.id}`, opts).then(convertiJson);
                alert(`user ${newAdmin.username} updated!`);
                window.location.replace("/profile-page-admin.html");
                return;
            } else {
                console.log("user not found");
                alert(`user not found`);
                return;
            }
        }
    }
});

function convertiJson(response) {
    return response.json();
}