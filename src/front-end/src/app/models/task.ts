export class Task {

    percent: string;
    _id: string;
    description: string;
    user: string;
    state: string;
    comment: string;

    constructor(percent = "", _id = "", description = "", user = "", state = "", comment = "") {        
        this.percent = percent;
        this._id = _id;
        this.description = description;
        this.user = user;
        this.state = state;
        this.comment = comment;
    }

}
