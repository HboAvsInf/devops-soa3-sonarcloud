
import { SlackSender } from "./API/slackSender";
import { INotificationSubscriber } from "./INotificationSubscriber";

export class SlackSubscriber implements INotificationSubscriber {
    notificationReceived: boolean = false;
    private _slackUsername: string;
    private _slackAdapter: SlackSender;
    
    constructor(slackUsername: string, slackAdapter : SlackSender) {
        this._slackUsername = slackUsername;
        this._slackAdapter = slackAdapter;
    }

    public notify(): void {
        this.notificationReceived = true;
        this.slackAdapter.sendSlackMessage(this._slackUsername);
      ;
    }

    public get slackUsername(): string {
        return this._slackUsername;
    }
    public set slackUsername(value: string) {
        this._slackUsername = value;
    }

    public get slackAdapter(): SlackSender {
        return this._slackAdapter;
    }
    public set slackAdapter(value: SlackSender) {
        this._slackAdapter = value;
    }

}