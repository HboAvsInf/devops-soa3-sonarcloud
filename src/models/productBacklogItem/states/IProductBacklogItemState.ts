import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";

export interface IProductBacklogItemState {
    todo(user: User): void;
	doing(): void;
    readyForTesting(user: User): void;
	testing(): void;
    tested(): void;
	done(user: User): void;
}