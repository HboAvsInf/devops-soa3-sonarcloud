import { Message } from "../forum/Message";
import { Thread } from "../forum/Thread";
import { Sprint } from "../sprints/sprint";

import { Task } from "../tasks/task";
import { Developer } from "../users/developer";
import { DoneState } from "./states/doneState";
import { IProductBacklogItemState } from "./states/IProductBacklogItemState";
import { TodoState } from "./states/todoState";

export class ProductBacklogItem {
	private _userStory: string;
	private _storyPoints: number;
	private _DoDChecked: boolean;
	private _developer?: Developer;
	private _subTasks: Task[];
	private _productBacklogItemState: IProductBacklogItemState;
	private _sprintBacklog: Sprint;
	private _thread?: Thread;
	
	public constructor(userStory: string, storyPoints: number) {
		this._userStory = userStory;
		this._storyPoints = storyPoints;
		this._subTasks = [];
		this._productBacklogItemState = new TodoState(this);
	}

	public DoDCheck(): boolean {
		return true;
	}

	public addTaskToProductBackLogItem(task: Task): void {
		task.linkedProductbacklogItem = this;
		this._subTasks.push(task);
	}

	public specifyDeveloper(developer: Developer): void {
		this._developer = developer;
	}

	public createThread(message: Message): void {
		this._thread = new Thread(message);
	}

	public addMessageToThread(newMessage: Message): void {
		if (this._thread != null && !(this._productBacklogItemState instanceof DoneState)) {
			this._thread.addMessage(newMessage);
		}
	}

	//Getters and Setters
	public get userStory(): string {
		return this._userStory;
	}
	public set userStory(value: string) {
		this._userStory = value;
	}

	public get subTasks(): Task[] {
		return this._subTasks;
	}
	public set subTasks(value: Task[]) {
		this._subTasks = value;
	}

	public get storyPoints(): number {
		return this._storyPoints;
	}
	public set storyPoints(value: number) {
		this._storyPoints = value;
	}

	public get developer(): Developer {
		return this._developer;
	}
	public set developer(value: Developer) {
		this._developer = value;
	}

	public get DoDChecked(): boolean {
		return this._DoDChecked;
	}
	public set DoDChecked(value: boolean) {
		this._DoDChecked = value;
	}

	public get productBacklogItemState(): IProductBacklogItemState {
		return this._productBacklogItemState;
	}
	public set productBacklogItemState(value: IProductBacklogItemState) {
		this._productBacklogItemState = value;
	}

	public get sprintBacklog(): Sprint {
		return this._sprintBacklog;
	}
	public set sprintBacklog(value: Sprint) {
		this._sprintBacklog = value;
	}

	public get thread(): Thread {
		return this._thread;
	}
	public set thread(value: Thread) {
		this._thread = value;
	}
}
