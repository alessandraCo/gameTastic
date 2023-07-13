//buttons - modal windows buttons
//modals
const modalInvite = document.getElementById("modal");
const modalChange = document.getElementById("modal-toChange");
//close and open buttons
const inviteButton = document.getElementById("invite-button");
const close1 = document.getElementById("close-button1");
const close2 = document.getElementById("close-button2");

//imports
import { LOGGED } from "./loggedUser.js";
import { User } from "./user.js";
import { sendMail } from "./email.js";

//context variable
let option;
let friend = null;
let friendSelected = new Array();

//modal windows: Invite Friend
//open "invite friend"
inviteButton.addEventListener("click", (e) => {
    //HTML manager
    const resultContainer = document.getElementById("usersFound");
    const errorMsg = document.getElementById("errorMsg");

    //HTML: cleare previous inputs
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }

    errorMsg.innerHTML = "";

    const display = window.getComputedStyle(modalInvite).display;
    if (display === "none") {
        modalInvite.style.display = "block";
    }
});
//close "invite friend"
close1.addEventListener("click", (e) => {
    const display = window.getComputedStyle(modalInvite).display;
    if (display === "block") {
        modalInvite.style.display = "none";
    }
});

//buttons - change user's personal info
const changeUsername = document.getElementById("changeUsername");
const changePassword = document.getElementById("changePassword");
const changeSub = document.getElementById("changeSub");

changeUsername.addEventListener("click", modalChangeManager);
changePassword.addEventListener("click", modalChangeManager);
changeSub.addEventListener("click", modalChangeManager);

//modal windows: change personal infos
//open "change personal info"
function modalChangeManager() {
    const display = window.getComputedStyle(modalChange).display;
    if (display === "none") {
        modalChange.style.display = "block";
    }
    //input
    const input = document.getElementById("toChange");
    //case: change username
    if (this === changeUsername) {
        option = changeUsername;
        input.type = "text";
        input.placeholder = " insert new username";
    }
    //case: change password 
    else if (this === changePassword) {
        option = changePassword;
        input.type = "text";
        input.placeholder = " insert new password";
    }
    //case: change subscription
    else if (this === changeSub) {
        option = document.getElementById("changeSub");
        input.type = "checkbox";
    }
}

//change button
const changeButton = document.getElementById("change-button");
changeButton.addEventListener("click", function () { changeButtonManager(option); });

function changeButtonManager(opt) {
    const input = document.getElementById("toChange");
    let user = LOGGED;
    //not empty fields
    if (input.value !== null) {
        if (opt === changeUsername) {
            user.changeUsername(input.value);
            LOGGED.username = input.value;
            sessionStorage.setItem("userLogged", input.value);
        }
        else if (opt === changePassword) {
            user.changePassword(input.value);
        }
        else if (opt === changeSub) {
            user.changeSubscription(input.checked);
        }
        const opts = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        };
        const id = sessionStorage.getItem("userId");
        fetch(`http://localhost:3000/users/${id}`, opts).then(convertiJson);
        window.location.replace("/profile-page.html");
        return;
    } else {
        return;
    }

}

function convertiJson(response) {
    return response.json();
}

//close "change personal info"
close2.addEventListener("click", (e) => {
    const display = window.getComputedStyle(modalChange).display;
    const input = document.getElementById("toChange");
    if (display === "block") {
        modalChange.style.display = "none";
    }
    input.value = "";
});

//add new friend button
const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-button");

addButton.addEventListener("click", function () { addFriend(friend); });

searchButton.addEventListener("click", (e) => {
    //HTML manager
    const toSearch = document.getElementById("toSearch").value;
    const resultContainer = document.getElementById("usersFound");
    const errorMsg = document.getElementById("errorMsg");

    //HTML: cleare previous inputs
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
    errorMsg.innerHTML = "";

    //context variable
    friend = null;

    //invalid input
    const usernameOfUserLogged = LOGGED.username;
    if (toSearch === null || toSearch.trim() === "" || toSearch === usernameOfUserLogged) {
        errorMsg.innerHTML = "invalid input";
        return;
    } else {
        //check if friend to add username is already present in friend list
        for (const f of LOGGED.friends) {
            if (f === toSearch) {
                console.log("User already in friends list");
                errorMsg.innerHTML = "User already in friends list";
                return;
            }
        }
        //searching for friend to add username in db
        fetch(`http://localhost:3000/users?username=${toSearch}`)
            .then((response) => response.json())
            .then(responseOK, responseKO);
        function responseOK(data) {
            //friend to add found
            if (data.length !== 0) {
                let getUser;
                for (let i = 0; i < data.length; i++) {
                    getUser = data[i].username;
                }
                if (getUser === toSearch) {
                    const newP = document.createElement("p");
                    newP.innerHTML = "User found: " + getUser;
                    resultContainer.appendChild(newP);
                    friend = getUser;
                }
            }
            //friend to add NOT found
            else {
                console.log("user not found");
                errorMsg.innerHTML = "user not found";
            }
        }
        function responseKO(err) {
            alert(err.message);
        }
    }
});

function addFriend(friend) {
    if (friend === null) {
        return;
    } else {
        LOGGED.addFriend(friend);
        let updatedUser = LOGGED;
        const opts = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        };
        const id = LOGGED.getId();
        fetch(`http://localhost:3000/users/${id}`, opts).then(convertiJson);
        window.location.reload();
        return;
    }
}

//send message
const sendButton = document.getElementById("send-button");
const modalMessage = document.getElementById("modal-message");
const sendButton2 = document.getElementById("send-button2");
const close3 = document.getElementById("close-button3");

sendButton.addEventListener("click", (e) => {
    const list = document.querySelectorAll('.checkbox');
    friendSelected = [];

    //getting the selected friends
    for (let i = 0; i < list.length; i++) {
        if (list[i].checked) {
            friendSelected.push(list[i].value);
        }
    }

    //open modal window
    const display = window.getComputedStyle(modalMessage).display;
    if (display === "none") {
        modalMessage.style.display = "block";
    }
});

//close modal window 
close3.addEventListener("click", (e) => {
    const display = window.getComputedStyle(modalMessage).display;
    if (display === "block") {
        modalMessage.style.display = "none";
    }
});

sendButton2.addEventListener("click", function () { sendMessage(friendSelected); });

function sendMessage(friendSelected) {
    if (friendSelected === null || friendSelected.length === 0) {
        return;
    } else {
        //getting message
        const message = document.getElementById("message").value;
        if (message === null || message === "") {
            return;
        } else {
            for (let i = 0; i < friendSelected.length; i++) {
                //getting user email
                fetch(`http://localhost:3000/users?username=${friendSelected[i]}`)
                    .then((response) => response.json())
                    .then(responseOK, responseKO);
                function responseOK(data) {
                    if (data.length !== 0) {
                        let getId, getUser, getEmail;
                        for (let i = 0; i < data.length; i++) {
                            getId = data[i].id;
                            getUser = data[i].username;
                            getEmail = data[i].email;
                        }
                        let toFriend = new User();
                        toFriend.id = getId
                        toFriend.username = getUser;
                        toFriend.email = getEmail;
                        sendMail(LOGGED.username, toFriend.username, LOGGED.email, toFriend.email, message);
                        //reset values:
                        //reset checkboxes
                        const checkboxes = document.getElementsByClassName("checkbox");
                        for(let i=0; i< checkboxes.length; i++) {
                            checkboxes[i].checked = false;
                        }
                        //reset input message
                        const inputMessage = document.getElementById("message");
                        inputMessage.value = "";

                        const display = window.getComputedStyle(modalMessage).display;
                        //close modal window
                        if (display === "block") {
                            modalMessage.style.display = "none";
                        }
                        return;
                    }
                }
                function responseKO(err) {
                    alert(err.message);
                }
            }
        }
    }
}



