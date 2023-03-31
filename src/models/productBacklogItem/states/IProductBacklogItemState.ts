import { User } from "../../users/user";

export interface IProductBacklogItemState {
    todo(user: User): void;
	doing(): void;
    readyForTesting(user: User): void;
	testing(): void;
    tested(): void;
	done(user: User): void;
}