//imports
import { User } from "./user.js";

//getting classification
window.addEventListener("load", (e) => {
    const firstPlayer = document.getElementById("first");
    const secondPlayer = document.getElementById("second");
    const thirdPlayer = document.getElementById("third");
    const tableBody = document.getElementById("table-body");

    let userList = new Array();
    let topTenList = new Array();

    //getting users' list (with id, username and score)
    fetch(`http://localhost:3000/users`)
        .then((response) => response.json())
        .then(responseOK);

    function responseOK(data) {
        if (data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                let user = {
                    id: data[i].id,
                    username: data[i].username,
                    score: data[i].score
                };
                userList.push(user);
            }
            //sorting users' list
            //getting only the top 10 users
            let end = 10;
            if (userList.length < 10) {
                end = userList.length;
            }
            let tempMaxScore;
            let tempMaxUser;
            for (let i = 0; i < end; i++) {
                tempMaxScore = 0;
                for (let j = 0; j < userList.length; j++) {
                    if (userList[j].score >= tempMaxScore) {
                        tempMaxScore = userList[j].score;
                        tempMaxUser = userList[j];
                    }
                }
                topTenList.push(tempMaxUser);
                let index = userList.indexOf(tempMaxUser);
                userList.splice(index, 1);
                const tr = document.createElement("tr");
                const tdPosition = document.createElement("td");
                const tdPlayer = document.createElement("td");
                const tdScore = document.createElement("td");
                tdPosition.innerHTML = i+1;
                tdPlayer.innerHTML = tempMaxUser.username;
                tdScore.innerHTML = tempMaxUser.score;
                tr.appendChild(tdPosition);
                tr.appendChild(tdPlayer);
                tr.appendChild(tdScore);
                tableBody.appendChild(tr);
            }
            console.log(topTenList);
            firstPlayer.innerHTML = topTenList[0].username;
            secondPlayer.innerHTML = topTenList[1].username;
            thirdPlayer.innerHTML = topTenList[2].username;
        } else {
            console.log("no user found");
            return;
        }
    }




});