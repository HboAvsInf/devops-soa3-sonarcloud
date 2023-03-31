import { ScrumMaster } from "../../../users/scrumMaster";
import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { InProgressState } from "./inProgressState";
import { IReleaseSprintState } from "./IReleaseSprintState";


export class CreatedState implements IReleaseSprintState {
    sprint: ReleaseSprint;

    public constructor(sprint: ReleaseSprint) {
        this.sprint = sprint;
    }

    created(): void {
        throw new Error("Method not implemented.");
    }
    inProgress(user: User): void {
        if (user instanceof ScrumMaster) {
            this.sprint.state = new InProgressState(this.sprint);
        }
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