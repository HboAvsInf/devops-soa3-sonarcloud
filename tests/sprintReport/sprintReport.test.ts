import { ImageReportBehaviour } from "../../src/models/sprintReport/Behaviour/imageReportBehaviour";
import { PdfReportBehaviour } from "../../src/models/sprintReport/Behaviour/pdfReportBehaviour";
import { SprintReport } from "../../src/models/sprintReport/sprintReport";
import { ReviewSprint } from "../../src/models/sprints/reviewSprint/reviewSprint";
import { SprintFactory, Sprints } from "../../src/models/sprints/sprintFactory";
import { ScrumMaster } from "../../src/models/users/scrumMaster";

describe("Report tests", () =>{
  
    let sm: ScrumMaster;

    beforeAll(() => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
        jest.spyOn(global.console, 'log').mockImplementation(() => {});
    });

    beforeEach(() => {
        sm = new ScrumMaster("Ruud", "Hermans", "rlm.hermans@avans.nl", "066223432", 20451234);
    });
    
    it("Generate a report from a sprint - pdf", () => {
    
        const reviewSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, new Date(), new Date(2024,1,1)) as ReviewSprint

        reviewSprint.generateSprintReportPDF();


        expect(reviewSprint.sprintReport).toBeInstanceOf(SprintReport);
    });

    it("Generate a report from a sprint - png", () => {
       
        const reviewSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, new Date(), new Date(2024,1,1)) as ReviewSprint

        reviewSprint.generateSprintReportPNG();

        expect(reviewSprint.sprintReport.sprintNr).toEqual(1);
        expect(reviewSprint.sprintReport.effortPoints).toEqual("50")
        expect(reviewSprint.sprintReport).toBeInstanceOf(SprintReport);
    });

    it("Generate a report from a sprint - png", () => {
       
        const reviewSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, new Date(), new Date(2024,1,1)) as ReviewSprint

       reviewSprint.generateSprintReportPNG();

    
        expect(reviewSprint.sprintReport.sprintNr).toEqual(1);
        expect(reviewSprint.sprintReport.effortPoints).toEqual("50");
        expect(reviewSprint.sprintReport.teamComposition).toEqual("John Smith (Product Owner), Jane Doe (Scrum Master), Bob Johnson (Developer)");
    });
});