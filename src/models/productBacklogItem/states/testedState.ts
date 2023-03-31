import { Developer } from "../../users/developer";
import { ScrumMaster } from "../../users/scrumMaster";
import { Tester } from "../../users/tester";
import { User } from "../../users/user";
import { ProductBacklogItem } from "../productBacklogItem";
import { DoneState } from "./doneState";
import { IProductBacklogItemState } from "./IProductBacklogItemState";
import {ReadyForTestingState } from "./readyForTestingState";

export class TestedState implements IProductBacklogItemState {
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
		if (user instanceof Developer) {
			{
                this.notifyTesters()
				this.productBacklogItem.productBacklogItemState = new ReadyForTestingState(this.productBacklogItem);
			}
		}
	}

	testing(): void {
		throw new Error("Method not implemented.");
	}
	tested(): void {
		throw new Error("Method not implemented.");
	}
    done(user: User): void {
        if (user instanceof Developer && this.productBacklogItem.DoDCheck && (this.productBacklogItem.subTasks.length == 0 || this.productBacklogItem.subTasks.every(a => a.taskState.done))) {
            this.productBacklogItem.productBacklogItemState = new DoneState(this.productBacklogItem);
        }
    }

	private notifyTesters(): void {
		if (this.productBacklogItem.sprintBacklog != null) {
			const team = this.productBacklogItem.sprintBacklog.teamMembers;
			for (const item of team) {
				if (item instanceof Tester) {
					item.notify();
				}
			}
		}
	}
}
