import { PipelineStatus } from "../../../devOps/developmentPipeline";
import { ScrumMaster } from "../../../users/scrumMaster";
import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";
import { CancelledState } from "./cancelledState";
import { CompletedState } from "./completedState";
import { IReleaseSprintState } from "./IReleaseSprintState";


export class FinishedState implements IReleaseSprintState {
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
		let restarts = 0
		this.sprint.startPipeline();

		if (this.sprint.developmentPipeline != null && this.sprint.developmentPipeline.pipelineStatus == PipelineStatus.Succeeded) {
			this.notifyScrumMasterAndProductOwner();
			this.sprint.state = new CompletedState(this.sprint);
		} else if (this.sprint.developmentPipeline.pipelineStatus == PipelineStatus.Failed)  {
			this.notifyScrumMasterAndProductOwner();
			if(restartPipeline && restarts < 3 ) {
				this.sprint.startPipeline();
				restarts++;
			}else {
				
				this.sprint.state = new CancelledState(this.sprint);
			}
		}
	}
	completed(): void {
		throw new Error("Method not implemented.");
	}
	cancelled(): void {
		this.notifyScrumMasterAndProductOwner();
		this.sprint.state = new CancelledState(this.sprint);
	}

	private notifyScrumMasterAndProductOwner(): void {
		const team = this.sprint.teamMembers;
		for (const item of team) {
			if (item instanceof ScrumMaster) {
				item.notify();
			}
		}

		if (this.sprint.rootProject != null && this.sprint.rootProject.productOwner != null) {
			this.sprint.rootProject.productOwner.notify();
		}
	}
}
