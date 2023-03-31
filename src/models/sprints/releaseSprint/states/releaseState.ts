import { PipelineStatus } from "../../../devOps/developmentPipeline";
import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { CancelledState } from "./cancelledState";
import { CompletedState } from "./completedState";

import { IReleaseSprintState } from "./IReleaseSprintState";

export class ReleaseState implements IReleaseSprintState {
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
	release(): void {
		if (this.sprint.developmentPipeline != null && this.sprint.developmentPipeline.pipelineStatus == PipelineStatus.Succeeded) {
			this.sprint.state = new CompletedState(this.sprint);
		}
	}
	completed(): void {
		throw new Error("Method not implemented.");
	}
	cancelled(): void {
		this.sprint.state = new CancelledState(this.sprint);
	}
}
