import { INotificationSubscriber } from "../notifications/INotificationSubscriber";

export abstract class User {
    private _studentNumber: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber: string;
    private _notificationTypes: INotificationSubscriber[];

    public constructor(firstName: string, lastName: string, email: string, phoneNumber: string, studentNumber: number) {
        this._studentNumber = studentNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._notificationTypes = [];
    }
    public addNotificationType(notificationSubscriber: INotificationSubscriber): void {
        this._notificationTypes.push(notificationSubscriber);
    }

    public removeNotificationType(notificationSubscriber: INotificationSubscriber): void {
        const index = this._notificationTypes.indexOf(notificationSubscriber);
        if (index !== -1) {
            this._notificationTypes.splice(index, 1);
        }
    }

    public notify(): void {
        for (const item of this._notificationTypes) {
            item.notify();
        }
    }

    //Getters and Setters
    public get studentNumber(): number {
        return this._studentNumber;
    }
    public set studentNumber(studentNumber: number) {
        this._studentNumber = studentNumber;
    }

    public get name(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    public get email(): string {
        return this._email;
    }
    public set email(email: string) {
        this._email = email;
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber;
    }

    public get notificationTypes(): INotificationSubscriber[] {
        return this._notificationTypes;
    }

    public set notificationTypes(notificationTypes: INotificationSubscriber[]) {
        this._notificationTypes = notificationTypes;
    }
}
