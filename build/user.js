"use strict";
export { User as User };
//User
class User {
    //constructor for creating a new user (registration)
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
    //function for retrieving a user from db (login)
    getUser(id, username, email, password, subscription, isAdmin, friends, score) {
        let user = new User();
        user.setId(id);
        user.changeUsername(username);
        user.email = email;
        user.changePassword(password);
        user.changeSubscription(subscription);
        user.setAdministration(isAdmin);
        user.friends = friends;
        user.score = score;
        return user;
    }

    getId() {
      return this.id;
    }
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
    setId(id) {
        this.id = id;
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
