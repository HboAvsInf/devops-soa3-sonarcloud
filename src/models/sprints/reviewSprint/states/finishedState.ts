
import { User } from "../../../users/user";
import { ReviewSprint } from "../reviewSprint";
import { IReviewSprintState } from "./IReviewSprintState";
import { ReviewState } from "./reviewState";

export class FinishedState implements IReviewSprintState {
	sprint: ReviewSprint;

	public constructor(sprint: ReviewSprint) {
		this.sprint = sprint;
	}

	created(): void {
		throw new Error("This is not correct way of states");
	}
	inProgress(user: User): void {
		throw new Error("This is not correct way of states");
	}
	finished(): void {
		throw new Error("We allready here");
	}
	review(): void {
		this.sprint.state = new ReviewState(this.sprint);
	}
	completed(user: User): void {
		throw new Error("This is not correct way of states");
	}
}
