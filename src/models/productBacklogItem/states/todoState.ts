import { ProductBacklogItem } from "../productBacklogItem";
import { DoingState } from "./doingState";
import { IProductBacklogItemState } from "./IProductBacklogItemState";

export class TodoState implements IProductBacklogItemState {
	private productBacklogItem: ProductBacklogItem;

	public constructor(productBacklogItem: ProductBacklogItem) {
		this.productBacklogItem = productBacklogItem;
	}
    
    todo(): void {
        throw new Error("Allready in Todo");
    }
    doing(): void {
        this.productBacklogItem.productBacklogItemState = (new DoingState(this.productBacklogItem));
    }
    readyForTesting(): void {
        throw new Error("This is not correct way");
    }
    testing(): void {
        throw new Error("This is not correct way");
    }
    tested(): void {
        throw new Error("This is not correct way");
    }
    done(): void {
        throw new Error("This is not correct way");
    }
}