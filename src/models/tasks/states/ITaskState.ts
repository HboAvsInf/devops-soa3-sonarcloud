//NOTE:  Een backlog item kan pas done zijn, indien alle onderliggende taken dat zijn.

import { Task } from "../task";

export interface ITaskState {
	task: Task;

	todo(): void;
	doing(): void;
	testing(): void;
	done(): void;
}
