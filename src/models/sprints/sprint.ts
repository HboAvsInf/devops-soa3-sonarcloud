import { DevelopmentPipeline } from "../devOps/developmentPipeline";
import { DevOpsRunner } from "../devOps/vistors/devOpsRunner";
import { ProductBacklogItem } from "../productBacklogItem/productBacklogItem";
import { Project } from "../project";
import { ImageReportBehaviour, SprintReport } from "../sprintReport/Behaviour/imageReportBehaviour";
import { PdfReportBehaviour } from "../sprintReport/Behaviour/pdfReportBehaviour";
import { User } from "../users/user";

export abstract class Sprint {
	private _sprintNumber: number;
	private _sprintBacklog?: ProductBacklogItem[];
	private _teamMembers: Array<User>;
	private _startDate: Date;
	private _endDate: Date;
	private _rootProject: Project;
	private _sprintReport?: SprintReport;
	private _developmentPipeline?: DevelopmentPipeline;

	constructor(sprintNumber: number, startDate: Date, endDate: Date) {
		this._sprintNumber = sprintNumber;
		this._sprintBacklog = [];
		this._teamMembers = new Array<User>();
		this._startDate = startDate;
		this._endDate = endDate;
	}
	public abstract IsSprintCreated(): boolean;
	public abstract IsSprintFinished(): boolean;

	public setPipeline(pipeline: DevelopmentPipeline): void {
		pipeline.sprint = this;
		this._developmentPipeline = pipeline;
	}

	public startPipeline(): void {
		if (this._developmentPipeline !== null) {
			const devOpsRunner = new DevOpsRunner();
			this._developmentPipeline.accept(devOpsRunner);
		}
	}

	public addTeamMember(user: User): void {
		if (this.IsSprintCreated()) {
			this._teamMembers.push(user);
		}
	}

	public addUserStoryToSprint(userStory: ProductBacklogItem): void {
		if (!this.IsSprintFinished()) {
			this._sprintBacklog.push(userStory);
		}
	}

	//Getters and Setters
	public get sprintNumber(): number {
		return this._sprintNumber;
	}

	public set sprintNumber(number: number) {
		if (this.IsSprintCreated()) {
			this._sprintNumber = number;
		}
	}

	public get sprintBacklog(): ProductBacklogItem[] {
		return this._sprintBacklog;
	}

	public set sprintBacklog(sprintBacklog: ProductBacklogItem[]) {
		this._sprintBacklog = sprintBacklog;
	}

	public get teamMembers(): Array<User> {
		return this._teamMembers;
	}

	public set teamMembers(teamMembers: Array<User>) {
		this._teamMembers = teamMembers;
	}

	public get startDate(): Date {
		return this._startDate;
	}

	public set startDate(date: Date) {
		if (this.IsSprintCreated()) {
			this._startDate = date;
		}
	}

	public get endDate(): Date {
		return this._endDate;
	}

	public set endDate(date: Date) {
		if (this.IsSprintCreated()) {
			this._endDate = date;
		}
	}

	public get rootProject(): Project {
		return this._rootProject;
	}

	public set rootProject(rootProject: Project) {
		this._rootProject = rootProject;
	}

	public get sprintReport(): SprintReport {
		return this._sprintReport;
	}

	public set report(report: SprintReport) {
		this._sprintReport = report;
	}

	public get developmentPipeline(): DevelopmentPipeline {
		return this._developmentPipeline;
	}

	public set developmentPipeline(developmentPipeline: DevelopmentPipeline) {
		this._developmentPipeline = developmentPipeline;
	}


	//Sprint report generate
	public generateSprintReportPDF(): void {
		const sprintReport = new SprintReport(this._sprintNumber, new PdfReportBehaviour());

		sprintReport.setHeader("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
		sprintReport.setFooter("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
		sprintReport.setTeamComposition("John Smith (Product Owner), Jane Doe (Scrum Master), Bob Johnson (Developer)");
		sprintReport.setEffortPoints("50");

		this.report = sprintReport;
	}

	public generateSprintReportPNG(): void {
		const sprintReport = new SprintReport(this._sprintNumber, new ImageReportBehaviour());

		sprintReport.setHeader("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
		sprintReport.setFooter("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
		sprintReport.setTeamComposition("John Smith (Product Owner), Jane Doe (Scrum Master), Bob Johnson (Developer)");
		sprintReport.setEffortPoints("50");

		this.report = sprintReport;
	}
}
