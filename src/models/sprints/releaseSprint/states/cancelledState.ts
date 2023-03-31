import { PipelineStatus } from "../../../devOps/developmentPipeline";
import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { IReleaseSprintState } from "./IReleaseSprintState";

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
		throw new Error("Method not implemented.");
	}
	release(restartPipeline: boolean): void {
		if (
			this.sprint.developmentPipeline != null &&
			this.sprint.developmentPipeline.pipelineStatus == PipelineStatus.Succeeded
		) {
			this.sprint.state = new CancelledState(this.sprint);
		}
	}
	completed(): void {
		throw new Error("Method not implemented.");
	}
	cancelled(): void {
		throw new Error("Method not implemented.");
	}
}
