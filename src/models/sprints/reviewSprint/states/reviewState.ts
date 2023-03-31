
import { ScrumMaster } from "../../../users/scrumMaster";
import { User } from "../../../users/user";
import { ReviewSprint } from "../reviewSprint";
import { CompletedState } from "./completedState";
import { IReviewSprintState } from "./IReviewSprintState";


export class ReviewState implements IReviewSprintState {
    sprint: ReviewSprint;

    public constructor(sprint: ReviewSprint) {
        this.sprint = sprint;
    }

    created(): void {
        throw new Error("Method not implemented.");
    }
    inProgress(user: User): void {
        throw new Error("Method not implemented.");
    }
    finished(): void {
        throw new Error("Method not implemented.");
    }
    review(): void {
        throw new Error("Method not implemented.");
    }
    completed(user: User): void {
        if (user instanceof ScrumMaster && this.sprint.Reviewed) {
        
                this.sprint.state = new CompletedState(this.sprint);
            }
        }
    }
