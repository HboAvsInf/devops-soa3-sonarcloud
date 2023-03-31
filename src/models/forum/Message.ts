import { User } from "../users/user";

export class Message {
    private _title: string;
    private _comment: string;
    private _user: User;

    public constructor(title: string, comment: string, user: User) {
        this._title = title;
        this._comment = comment;
        this._user = user;
    }

    //Getters and Setters
    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get comment(): string {
        return this._comment;
    }

    public set comment(comment: string) {
        this._comment = comment;
    }

    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }
    
}
