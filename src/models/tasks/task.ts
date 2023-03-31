import { ProductBacklogItem } from "../productBacklogItem/productBacklogItem";
import { Developer } from "../users/developer";
import { ITaskState } from "./states/ITaskState";
import { TodoState } from "./states/todoState";

export class Task {
	private _taskName: string;
	private _linkedProductbacklogItem: ProductBacklogItem;
	private _developer: Developer;
	private _taskState: ITaskState;

	//Getters and Setters
	public constructor(taskName: string) {
		this._taskName = taskName;
		this._taskState = new TodoState(this);
	}

	public get taskName(): string {
		return this._taskName;
	}
	public set taskName(value: string) {
		this._taskName = value;
	}

	public get linkedProductbacklogItem(): ProductBacklogItem {
		return this._linkedProductbacklogItem;
	}
	public set linkedProductbacklogItem(value: ProductBacklogItem) {
		this._linkedProductbacklogItem = value;
	}

	public get developer(): Developer {
		return this._developer;
	}
	public set developer(value: Developer) {
		this._developer = value;
	}

	public get taskState(): ITaskState {
		return this._taskState;
	}
	public set taskState(value: ITaskState) {
		this._taskState = value;
	}
}
