import { Developer } from "../../users/developer";
import { ScrumMaster } from "../../users/scrumMaster";
import { Tester } from "../../users/tester";
import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";
import { IProductBacklogItemState } from "./IProductBacklogItemState";
import { TestingState } from "./testingState";
import { TodoState } from "./todoState";

export class ReadyForTestingState implements IProductBacklogItemState {
	private productBacklogItem: ProductBacklogItem;

	public constructor(productBacklogItem: ProductBacklogItem) {
		this.productBacklogItem = productBacklogItem;
	}

	todo(user: User): void {
		if (user instanceof Tester) {
			{
				this.notifyScrumMaster();
				this.productBacklogItem.productBacklogItemState = new TodoState(this.productBacklogItem);
			}
		}
	}

	doing(): void {
		throw new Error("This is not correct way");
	}
	readyForTesting(user: User): void {
		throw new Error("This is not correct way");
	}
	testing(): void {
		this.productBacklogItem.productBacklogItemState = new TestingState(this.productBacklogItem);
	}
	tested(): void {
		throw new Error("This is not correct way");
	}
	done(user: User): void {
		throw new Error("This is not correct way");
	}

	private notifyScrumMaster(): void {
		if (this.productBacklogItem.sprintBacklog && this.productBacklogItem.sprintBacklog.teamMembers != null) {
			for (const teamMember of this.productBacklogItem.sprintBacklog.teamMembers) {
				if (teamMember instanceof ScrumMaster) {
					teamMember.notify();
				}
			}
		}
	}
}
