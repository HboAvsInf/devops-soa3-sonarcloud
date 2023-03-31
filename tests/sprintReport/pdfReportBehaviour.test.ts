import fs from "fs";
import { PdfReportBehaviour } from "../../src/models/sprintReport/Behaviour/pdfReportBehaviour";
import { SprintReport } from "../../src/models/sprintReport/sprintReport";
import { ImageReportBehaviour } from "../../src/models/sprintReport/Behaviour/imageReportBehaviour";

jest.mock("fs");

describe("PdfReportBehaviour", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("generateReport", () => {
		it("should write the report to a file", () => {
			const sprintReport = new SprintReport(1, new PdfReportBehaviour());

			sprintReport.setHeader("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
			sprintReport.setFooter("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
			sprintReport.setTeamComposition(
				"John Smith (Product Owner), Jane Doe (Scrum Master), Bob Johnson (Developer)"
			);
			sprintReport.setEffortPoints("50");

			sprintReport.reportGenerator.generateReport(sprintReport);

			expect(fs.writeFile).toHaveBeenCalledTimes(1);
			expect(fs.writeFile).toHaveBeenCalledWith(
				"resources/pdf/report-1.pdf",
				expect.any(String),
				expect.any(Function)
			);
		});

    it("should write the report to a file", () => {
			const sprintReport = new SprintReport(1, new ImageReportBehaviour());

			sprintReport.setHeader("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
			sprintReport.setFooter("company_logo.png", "Acme Corporation", "Project X", 1, new Date());
			sprintReport.setTeamComposition(
				"John Smith (Product Owner), Jane Doe (Scrum Master), Bob Johnson (Developer)"
			);
			sprintReport.setEffortPoints("50");

			sprintReport.reportGenerator.generateReport(sprintReport);

			expect(fs.writeFile).toHaveBeenCalledTimes(1);
			expect(fs.writeFile).toHaveBeenCalledWith(
				"resources/png/report-1.png",
				expect.any(String),
				expect.any(Function)
			);
		});
	});
});
