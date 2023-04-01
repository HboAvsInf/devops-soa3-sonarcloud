import { SprintReport } from "../sprintReport";


export interface IReportBehaviour {
	generateReport(report: SprintReport): any;
}
