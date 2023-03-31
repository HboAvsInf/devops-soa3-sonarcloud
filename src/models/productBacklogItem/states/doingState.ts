import { Developer } from "../../users/developer";
import { Tester } from "../../users/tester";
import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";
import { IProductBacklogItemState } from "./IProductBacklogItemState";
import {ReadyForTestingState } from "./readyForTestingState";

export class DoingState implements IProductBacklogItemState {
	private productBacklogItem: ProductBacklogItem;

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
		if (user instanceof Developer) {
			{
				this.notifyTesters();
				this.productBacklogItem.productBacklogItemState = new ReadyForTestingState(this.productBacklogItem);
			}
		}
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

	private notifyTesters(): void {
		if (this.productBacklogItem.sprintBacklog && this.productBacklogItem.sprintBacklog.teamMembers != null) {
			for (const teamMember of this.productBacklogItem.sprintBacklog.teamMembers) {
				if (teamMember instanceof Tester) {
					teamMember.notify();
				}
			}
		}
	}
}
