import { SprintReport } from "../sprintReport";
import { IReportBehaviour } from "./IReportBehaviour";
import * as fs from "fs";

export class ImageReportBehaviour implements IReportBehaviour {
	generateReport(report: SprintReport) {
		let file: string = `${report.header.toString()} \n ${report.teamComposition} \n ${report.burndownChart} \n ${
			report.effortPoints
		} \n ${report.footer.toString()}`;
		fs.writeFile(`resources/png/report-${report.sprintNr}.png`, file, function (err) {
			if (err) {
				return console.error(err);
			}
		});
		console.log("PDF report generated")
	}
}


