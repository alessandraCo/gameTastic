//authentication using json-server
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

//User
class User {
  //public static idAll: number = 2;
  //private id: number;
  username: string;
  email: string | undefined;
  password: string;
  subscription: boolean;
  isAdmin: boolean;
  friends: User[];

  public constructor(
    username: string,
    email: string | undefined,
    password: string,
    subscription: boolean,
    authorization: boolean = false
  ) {
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

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getSubscription(): boolean {
    return this.subscription;
  }

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  public changePassword(newPassword: string) {
    this.password = newPassword;
  }

  public changeEmail(newEmail: string) {
    this.email = checkMail(newEmail);
  }

  public changeSubscription(newSubscription: boolean) {
    this.subscription = newSubscription;
  }

  public setAdministration(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  public printUser() {
    // console.log("| id utente: | " + this.id);
    console.log("| username:  | " + this.username);
    console.log("| email:     | " + this.email);
    this.subscription
      ? console.log("| newsletter:| yes")
      : console.log("| newsletter:| no");
  }
}

//login
loginButton?.addEventListener("click", (e) => {
  e.preventDefault();
  const inputUser = (<HTMLInputElement>document.getElementById("username"))
    ?.value;
  const inputPassword = (<HTMLInputElement>document.getElementById("password"))
    ?.value;
  if (
    inputUser != null &&
    inputUser.trim() !== "" &&
    inputPassword != null &&
    inputPassword !== ""
  ) {
    e.preventDefault();
    //serching for username in db
    const loginUser = fetch(`http://localhost:3000/users?username=${inputUser}`)
      .then((response) => response.json())
      .then(responseOK, responseKO);

    function responseOK(data: any) {
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
          } else {
            const errorMsg = document.getElementById("errorMsg");
            if (errorMsg !== null && errorMsg != undefined) {
              errorMsg.innerText = "Incorrect username or password"; //passwordKO
            }
          }
        } else {
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

    function responseKO(err: any) {
      alert(err.message);
    }
  }
});

//registration
registerButton?.addEventListener("click", (e) => {
  const msg = document.getElementById("errorMsg");
  if (msg !== undefined && msg !== null) {
    e.preventDefault();
    msg.innerText = "";
  }

  const inputUser: string = (<HTMLInputElement>(
    document.getElementById("usernameIn")
  ))?.value;
  const inputPassword: string = (<HTMLInputElement>(
    document.getElementById("passwordIn")
  ))?.value;
  const inputEmail: string = (<HTMLInputElement>(
    document.getElementById("email")
  ))?.value;
  const inputNews: boolean = (<HTMLInputElement>(
    document.getElementById("newsletter")
  ))?.checked;

  if (
    inputUser !== null &&
    inputUser !== "" &&
    inputPassword !== null &&
    inputPassword !== "" &&
    inputEmail !== null &&
    inputEmail !== ""
  ) {
    const newUser = new User(
      inputUser.trim(),
      checkMail(inputEmail),
      inputPassword,
      inputNews || false,
      false
    );

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
  function convertiJson(response: any) {
    return response.json();
  }

  //second callback:
  //responseOK: registration success
  function responseOK() {
    const message: string = "You registered in! Try to login!";
    alert(message);
  }

  //responseKO: registration failed
  function responseKO(err: any) {
    alert(err.message);
  }
});

//check mail using regex expression
function checkMail(email: string): string | undefined {
  //HTML manager
  const msg = document.getElementById("errorMsg");
  if (msg !== undefined && msg !== null) {
    msg.innerText = "";
  }

  let mailRegex: string =
    "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
  const check = email.match(mailRegex);
  if (check) {
    return email;
  } else {
    console.log(
      "This email is not valid and will not be registered. You can modify your email later"
    );
    if (msg !== undefined && msg !== null) {
      msg.innerText =
        "This email is not valid and will not be registered. You can modify your email later";
    }
    return undefined;
  }
}
