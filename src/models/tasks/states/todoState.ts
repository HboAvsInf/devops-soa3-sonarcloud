import { Task } from "../task";
import { DoingState } from "./doingState";
import { ITaskState } from "./ITaskState";

export class TodoState implements ITaskState {
	task: Task;

	public constructor(task: Task) {
		this.task = task;
	}

	todo(): void {
		throw new Error("Allready in Todo");
	}
	doing(): void {
		if (this.task.developer != null) {
			this.task.taskState = (new DoingState(this.task));
		} else {
			throw new Error('You need to have a developer to change the state to "doing"');
		}
	}
	testing(): void {
		throw new Error("You can't go from Todo to Testing.");
	}
	done(): void {
		throw new Error("You can't go from Todo to Done ");
	}
}
