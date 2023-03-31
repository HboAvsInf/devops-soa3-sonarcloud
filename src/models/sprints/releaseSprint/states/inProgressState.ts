import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { FinishedState } from "./finishedState";
import { IReleaseSprintState } from "./IReleaseSprintState";

export class InProgressState implements IReleaseSprintState {
    sprint: ReleaseSprint;

    public constructor(sprint: ReleaseSprint) {
        this.sprint = sprint;
    }

    created(): void {
        throw new Error("Method not implemented.");
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
    release(restartPipeline: boolean): void {
        throw new Error("Method not implemented.");
    }
    completed(): void {
        throw new Error("Method not implemented.");
    }
    cancelled(): void {
        throw new Error("Method not implemented.");
    }
    
}