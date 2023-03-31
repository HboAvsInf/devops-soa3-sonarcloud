import { Task } from "../task";
import { DoneState } from "./doneState";
import { ITaskState } from "./ITaskState";
import { TodoState } from "./todoState";

export class TestingState implements ITaskState {
    task: Task;
    public constructor(task: Task) {
        this.task = task;
    }

    todo(): void {
        this.task.taskState = (new TodoState(this.task));
    }
    doing(): void {
        throw new Error("This is not correct way of states");
    }
    testing(): void {
        throw new Error("We are already in Testing state!");
    }
    done(): void {
        this.task.taskState = (new DoneState(this.task));
    }
}