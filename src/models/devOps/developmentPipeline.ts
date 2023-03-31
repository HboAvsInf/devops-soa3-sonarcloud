import { Sprint } from "../sprints/sprint";
import { ScrumMaster } from "../users/scrumMaster";
import { CompositeComponent } from "./compositeComponent";
import { Visitor } from "./vistors/vistor";

export class DevelopmentPipeline {
	private _pipelineName: String;
	private _jobs: Array<CompositeComponent>;
	private _pipelineStatus: PipelineStatus = PipelineStatus.NotStarted;
	private _sprint?: Sprint;
	
	constructor(pipelineName: String) {
		this.pipelineName = pipelineName;
		this.jobs = new Array<CompositeComponent>();
	}

	public addJob(job: CompositeComponent) {
		this.jobs.push(job);
	}
	
	public accept(visitor: Visitor) {
		visitor.visitPipeline(this);
	}

	public notifyScrumMasters(): void {
		if (this.sprint != null) {
			if (this.pipelineStatus == PipelineStatus.Failed) {
				const team = this.sprint.teamMembers;
				for (const item of team) {
					if (item instanceof ScrumMaster) {
						item.notify();
					}
				}
			}
		}
	}

	public get pipelineName(): String {
		return this._pipelineName;
	}
	public set pipelineName(value: String) {
		this._pipelineName = value;
	}

	public get jobs(): Array<CompositeComponent> {
		return this._jobs;
	}
	public set jobs(value: Array<CompositeComponent>) {
		this._jobs = value;
	}

	public get pipelineStatus(): PipelineStatus {
		return this._pipelineStatus;
	}
	public set pipelineStatus(value: PipelineStatus) {
		this._pipelineStatus = value;
	}

	public get sprint(): Sprint {
		return this._sprint;
	}
	public set sprint(value: Sprint) {
		this._sprint = value;
	}
}

export enum PipelineStatus {
	NotStarted,
	InProgress,
	Succeeded,
	Failed,
}
