import { EmailSender } from "./API/emailSender";
import { INotificationSubscriber } from "./INotificationSubscriber";

export class EmailSubscriber implements INotificationSubscriber {
	notificationReceived: boolean = false;
	private _emailAdress: string;
	private _emailAdapter: EmailSender;
	
	constructor(_emailAdress: string, _emailAdapter: EmailSender) {
		this._emailAdress = _emailAdress;
		this._emailAdapter = _emailAdapter;
	}

	public notify(): void {
		this.notificationReceived = true;
		this.emailAdapter.sendEmail(this.emailAdress);
	}

	public get emailAdress(): string {
		return this._emailAdress;
	}
	public set emailAdress(value: string) {
		this._emailAdress = value;
	}

	public get emailAdapter(): EmailSender {
		return this._emailAdapter;
	}
	public set emailAdapter(value: EmailSender) {
		this._emailAdapter = value;
	}
}
