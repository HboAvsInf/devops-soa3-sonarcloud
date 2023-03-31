import { User } from "../../../users/user";
import { ReviewSprint } from "../reviewSprint";

export interface IReviewSprintState {
	sprint: ReviewSprint;
	created(): void;
	inProgress(user: User): void;
	finished(): void;
	review(): void;
	completed(user: User): void;
}
