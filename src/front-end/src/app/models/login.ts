export class Login {

    email: string;
    password: string;

    constructor(email = "", password = "") {
        this.email = email;
        this.password = password;
    }

}

export class Response {

    token: string;
    expiresIn: string;

    constructor(token = "", expiresIn = "") {
        this.token = token;
        this.expiresIn = expiresIn;
    }
    
}