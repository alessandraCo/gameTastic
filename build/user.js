"use strict";
export { User as User };
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
        this.score = 0;
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
    addFriend(friend) {
        this.friends.push(friend);
    }
    // public removeFriend(friend : User) {
    //   this.friends.
    // }
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
