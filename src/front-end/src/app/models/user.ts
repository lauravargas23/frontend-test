export class User {
    _id: string;
    rol: string;
    signupDate: string;
    email: string;
    password: string;

    constructor(_id = "", rol = "", signupDate = "", email = "", password = "") {
        this._id = _id;
        this.rol = rol;
        this.signupDate = signupDate;
        this.email = email;
        this.password = password;
    }

}
