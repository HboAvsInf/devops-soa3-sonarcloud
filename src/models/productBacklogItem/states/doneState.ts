import { Developer } from "../../users/developer";
import { Tester } from "../../users/tester";
import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";
import { IProductBacklogItemState } from "./IProductBacklogItemState";

export class DoneState implements IProductBacklogItemState {
    productBacklogItem: ProductBacklogItem;

	public constructor(productBacklogItem: ProductBacklogItem) {
		this.productBacklogItem = productBacklogItem;
	}

    todo(user: User): void {
        throw new Error("This is not correct way");
    }
    doing(): void {
        throw new Error("This is not correct way");
    }
    readyForTesting(user: User): void {
        throw new Error("This is not correct way");               
    }
    testing(): void {
        throw new Error("This is not correct way");
    }
    tested(): void {
        throw new Error("This is not correct way");
    }
    done(user: User): void {
        throw new Error("This is not correct way");
    }

}