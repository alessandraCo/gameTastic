//logout buttons
const logoutButton1 = document.getElementById("logout1");
const logoutButton2 = document.getElementById("logout2");

logoutButton1?.addEventListener("click", logout);
logoutButton2?.addEventListener("click", logout);

function logout() {
    sessionStorage.clear();
    window.location.replace("/index.html");
}