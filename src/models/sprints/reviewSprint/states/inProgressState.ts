import { FinishedState } from "./finishedState";
import { IReviewSprintState } from "./IReviewSprintState";
import { ReviewSprint } from "../reviewSprint";
import { User } from "../../../users/user";

export class InProgressState implements IReviewSprintState {
    sprint: ReviewSprint;

    public constructor(sprint: ReviewSprint) {
        this.sprint = sprint;
    }

    created(): void {
        throw new Error("This is not correct way of states");
    }
    
    inProgress(user: User): void {
        throw new Error("Method not implemented.");
    }

    finished(): void {
        if (this.sprint.endDate <= new Date())
        {
            this.sprint.state = new FinishedState(this.sprint);
        }  
    }

    review(): void {
        throw new Error("This is not correct way of states");
    }
    completed(user: User): void {
        throw new Error("This is not correct way of states");
    }
    
}