import { User } from "../users/user";
import { Message } from "./Message";

export class Thread {
  private _messages: Message[];
  private _subscribedUsers: User[];

  constructor(message: Message) {
    this._messages = [];
    this._subscribedUsers = [];
    this.addMessage(message);
  }

  public addMessage(newMessage: Message): void {
    this._messages.push(newMessage);
    this.notifySubscribers();
    this.subscribe(newMessage.user);
  }

  private notifySubscribers(): void {
    const lastPostUser = this._messages[this._messages.length - 1].user;
    this._subscribedUsers
      .filter(user => user !== lastPostUser)
      .forEach(user => user.notify());
  }

  public subscribe(user: User): void {
    if (!this._subscribedUsers.includes(user)) {
      this._subscribedUsers.push(user);
    }
  }

  public unsubscribe(user: User): void {
    const index = this._subscribedUsers.indexOf(user);
    if (index !== -1) {
      this._subscribedUsers.splice(index, 1);
    }
  }

  //Getters and Setters
  public get messages(): Message[] {
    return this._messages;
  }

  public set messages(messages: Message[]) {
    this._messages = messages;
  }

  public get subscribedUsers(): User[] {
    return this._subscribedUsers;
  }

  public set subscribedUsers(subscribedUsers: User[]) {
    this._subscribedUsers = subscribedUsers;
  }

}