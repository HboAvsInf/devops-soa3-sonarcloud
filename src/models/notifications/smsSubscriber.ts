
import { SMSSender } from "./API/smsSender";
import { INotificationSubscriber } from "./INotificationSubscriber";

export class SmsSubscriber implements INotificationSubscriber{
    private _phoneNumber: string;
    private _smsAdapter: SMSSender;
 
    notificationReceived: boolean = false;

    constructor(phoneNumber: string, smsAdapter : SMSSender){
        this._phoneNumber = phoneNumber;
        this._smsAdapter = smsAdapter;
    }
   
    notify() {
        this.notificationReceived = true;
        console.log(this)
        this._smsAdapter.sendSMS(this._phoneNumber);
    }

    public get smsAdapter(): SMSSender {
        return this._smsAdapter;
    }
    public set smsAdapter(value: SMSSender) {
        this._smsAdapter = value;
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }
    
}