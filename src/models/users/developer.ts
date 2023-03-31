import { User } from "./user";

export class Developer extends User {
	constructor(firstName: string, lastName: string, email: string, phoneNumber: string, studentNumber: number) {
		super(firstName, lastName, email, phoneNumber, studentNumber);
	}
}
