import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { IReleaseSprintState } from "./IReleaseSprintState";

export class CompletedState implements IReleaseSprintState {
    
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
        throw new Error("Method not implemented.");
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