export interface INotificationSubscriber {
  notificationReceived: boolean;
  notify(): void;
}