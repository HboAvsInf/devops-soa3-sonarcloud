import { Task } from "../task";
import { ITaskState } from "./ITaskState";

export class DoneState implements ITaskState {
  
    task: Task;

    public constructor(task: Task) {
        this.task = task;
    }

    todo(): void {
        throw new Error("This Task is already tested and done");
    }
    doing(): void {
        throw new Error("This Task is already tested and done");
    }
    testing(): void {
        throw new Error("This Task is already tested and done");
    }
    done(): void {
        throw new Error("This Task is already tested and done");
    }
    
}