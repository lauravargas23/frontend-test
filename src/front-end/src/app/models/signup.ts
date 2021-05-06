export class Signup {

    email: string;
    password: string;
    passwordRepeat: string;

    constructor(email = "", password = "", passwordRepeat= "") {
        this.email = email;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
    }
    
}