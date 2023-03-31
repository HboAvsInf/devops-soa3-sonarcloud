import { User } from "../../../users/user";
import { ReviewSprint } from "../reviewSprint";
import { IReviewSprintState } from "./IReviewSprintState";

export class CompletedState implements IReviewSprintState {
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
        throw new Error("Method not implemented.");
    }
    
}