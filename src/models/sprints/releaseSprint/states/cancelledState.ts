import { PipelineStatus } from "../../../devOps/developmentPipeline";
import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { IReleaseSprintState } from "./IReleaseSprintState";
import { FinishedState } from "./finishedState";

export class CancelledState implements IReleaseSprintState {
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
		this.sprint.state = new FinishedState(this.sprint)
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
