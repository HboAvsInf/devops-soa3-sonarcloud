import { Task } from "../task";
import { ITaskState } from "./ITaskState";
import { TestingState } from "./testingState";
import { TodoState } from "./todoState";

export class DoingState implements ITaskState {
	task: Task;
	public constructor(task: Task) {
		this.task = task;
	}

	todo(): void {
		this.task.taskState = (new TodoState(this.task));
	}
	doing(): void {
		throw new Error("You are already in Doing state!");
	}
	testing(): void {
        this.task.taskState =(new TestingState(this.task));
	}
	done(): void {
		throw new Error("That's not correct! You first need to test this Task!");
	}
}
