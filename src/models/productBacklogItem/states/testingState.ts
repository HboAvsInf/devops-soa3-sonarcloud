import { Tester } from "../../users/tester";
import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";
import { IProductBacklogItemState } from "./IProductBacklogItemState";
import { TestedState } from "./testedState";
import { TodoState } from "./todoState";

export class TestingState implements IProductBacklogItemState {
	private productBacklogItem: ProductBacklogItem;

	public constructor(productBacklogItem: ProductBacklogItem) {
		this.productBacklogItem = productBacklogItem;
	}

    todo(user: User): void {
        throw new Error("Method not implemented.");
    }
    doing(): void {
        throw new Error("Method not implemented.");
    }
    readyForTesting(user: User): void {
        throw new Error("Method not implemented.");
    }
    testing(): void {
        throw new Error("Method not implemented.");
    }
    tested(): void {
        this.productBacklogItem.productBacklogItemState = new TestedState(this.productBacklogItem);
    }
    done(user: User): void {
        throw new Error("Method not implemented.");
    }
}