
import { ScrumMaster } from "../../../users/scrumMaster";
import { User } from "../../../users/user";
import { ReviewSprint } from "../reviewSprint";
import { InProgressState } from "./inProgressState";
import { IReviewSprintState } from "./IReviewSprintState";

export class CreatedState implements IReviewSprintState {
    sprint: ReviewSprint;

    public constructor(sprint: ReviewSprint) {
        this.sprint = sprint;
    }

    created(): void {
        throw new Error("Allready in created");
    }

    inProgress(user: User): void {
        if (user instanceof ScrumMaster) {
            this.sprint.state = new InProgressState(this.sprint);
        }
    }

    finished(): void {
        throw new Error("We need first to go in progress then we can finish sprint!");
    }

    review(): void {
        throw new Error("Not working when Sprint is not created");
    }

    completed(user: User): void {
        throw new Error("Not working when Sprint is not created");
    }
    
}