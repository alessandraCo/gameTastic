# **gameTastic**
#### Small platform-game application with login and newsletter
---
## **Demo**
![](https://github.com/alessandraCo/gameTastic/blob/main/demo.gif)
---
## **Description**
* GameTastic is a small platform-game application.
* It uses a json-server database.
* A user can:
    * registrate to the app (giving a valid email, controlled with regex expression)
    * login
    * view profile and change personal data (username, password, subscription to newsletter)
    * add friends (other registered users) to friends' list
    * send messages to all friends selected 
    * view top-player ranking
* If the user is an admin (boolean attribute of user), in the profile page there is an additional menu. An admin can:
    * send newsletter to all users subscribed
    * make someone an admin 
---
## **Additional infos**
* The features of sending messages to friends and sending newsletter to all users subscribed were implemented using Ethereal and EmailJS.

* *Ethereal* is a fake SMTP service, completely free anti-transactional email service where messages never get delivered
* [Ethereal](https://ethereal.email/)

* *EmailJS* helps to send emails using client-side technologies only. No server is required: it is possible just to connect EmailJS to one of the supported email services (in this case Ethereal account) and create an email template.
* [EmailJS](https://www.emailjs.com/)
---
## **Admin Demo**
![](https://github.com/alessandraCo/gameTastic/blob/main/admin%20demo.gif)
---
## **Installation**
1. Clone this repository
2. First start the server: 
    * You will need to download and install [NodeJd](https://nodejs.org): you can check if you have already installed it typing in the terminal `node -v`: if this command returns the `node.js` version, you can skip this passage
    * in the terminal, point the `gametastic.json` folder
    * then type `json-server --watch gametastic.json`
    * if it doesn't work, type `npx json-server --watch gametastic.json`
3. now you can run the project: you can use the `gametastic.json` database if you want to login with a user that already exists or you can register a new user


