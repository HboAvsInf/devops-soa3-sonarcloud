import * as fs from "fs";
import { SprintReport } from "../sprintReport";
import { IReportBehaviour } from "./IReportBehaviour";

export class PdfReportBehaviour implements IReportBehaviour {
	generateReport(report: SprintReport) {
		let file: string = `${report.header.toString()} \n ${report.teamComposition} \n ${report.burndownChart} \n ${
			report.effortPoints
		} \n ${report.footer.toString()}`;
		fs.writeFile(`resources/pdf/report-${report.sprintNr}.pdf`, file, function (err) {
			if (err) {
				return console.error(err);
			}
			console.log("Sprint report has been created! - pdf");
		});
	}
}
