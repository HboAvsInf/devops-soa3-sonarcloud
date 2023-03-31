import { CompositeComponent } from "../compositeComponent";
import { Folder } from "../map";
import { DevelopmentPipeline, PipelineStatus } from "../developmentPipeline";
import { Visitor } from "./vistor";
import { Commando } from "../commando";

export class DevOpsRunner extends Visitor {
	private jobCount: number = 0;

	private incrementJobCount() {
		this.jobCount++;
	}

	public visitPipeline(pipeline: DevelopmentPipeline) {
		pipeline.pipelineStatus = PipelineStatus.InProgress;

		if (pipeline.jobs.length != 0) {
			pipeline.jobs.forEach((item) => {
				item.acceptVisitor(this);
			});
			pipeline.pipelineStatus = PipelineStatus.Succeeded;
		} else {
			pipeline.pipelineStatus = PipelineStatus.Failed;
		}
	}

	public visitComponents(component: CompositeComponent) {
		this.incrementJobCount();
		component.components.forEach((item) => {
			item.acceptVisitor(this);
		});
	}

	public visitCommand(command: Commando) {
		this.incrementJobCount();
	}

	public visitFolder(folder: Folder) {
		this.incrementJobCount();
	}
}
