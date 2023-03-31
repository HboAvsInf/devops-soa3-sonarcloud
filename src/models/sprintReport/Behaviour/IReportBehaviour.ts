import { SprintReport } from "./imageReportBehaviour";

export interface IReportBehaviour {
	generateReport(report: SprintReport): any;
}
