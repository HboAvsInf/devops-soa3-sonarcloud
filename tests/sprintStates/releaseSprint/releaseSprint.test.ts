import { Commando } from "../../../src/models/devOps/commando";
import { DevelopmentPipeline } from "../../../src/models/devOps/developmentPipeline";
import { Folder } from "../../../src/models/devOps/map";
import { ReleaseSprint } from "../../../src/models/sprints/releaseSprint/releaseSprint";
import { CompletedState } from "../../../src/models/sprints/releaseSprint/states/completedState";
import { FinishedState } from "../../../src/models/sprints/releaseSprint/states/finishedState";
import { InProgressState } from "../../../src/models/sprints/releaseSprint/states/inProgressState";
import { SprintFactory, Sprints } from "../../../src/models/sprints/sprintFactory";
import { Developer } from "../../../src/models/users/developer";
import { ProductOwner } from "../../../src/models/users/productOwner";
import { ScrumMaster } from "../../../src/models/users/scrumMaster";
import { Tester } from "../../../src/models/users/tester";


describe("Release Sprint test", () => {
	let productOwner: ProductOwner;
	let sm: ScrumMaster;
	let ts: Tester;
	let dev: Developer;
	const DUMMY_STRING = "DUMMY";
	const DUMMY_NUMBERS = 6289022454;

	beforeEach(() => {
		productOwner = new ProductOwner("Arno", "Broeders", "a.broeders@avans.nl", "066223432", 20451234);
		sm = new ScrumMaster("Ruud", "Hermans", "rlm.hermans@avans.nl", "066223432", 20451234);
		ts = new Tester("Dion", "Koeze", "dj.koeze@avans.nl", "066223432", 20451234);
		dev = new Developer("Pascal", "van Gastel", "ppth.vangastel@avans.nl", "066223432", 20451234);
	});

	describe("Release Sprint", () => {
		it("SprintFactory should make Release Sprint", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
            const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
            

			// Assert
			expect(releaseSprint).toBeInstanceOf(ReleaseSprint);
			expect(releaseSprint.sprintNumber).toEqual(1);
			expect(releaseSprint.startDate).toEqual(startDate);
			expect(releaseSprint.endDate).toEqual(endDate);
		});

		it("ReleaseSprint To State In Progress", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;


			releaseSprint.state.inProgress(sm);

			// Assert
			expect(releaseSprint.state instanceof InProgressState).toBe(true);
		});

		it("Can't update sprintNumber In Progress State", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;

			releaseSprint.state.inProgress(sm);

			releaseSprint.sprintNumber = 2;

			// Assert
			expect(releaseSprint.sprintNumber).toEqual(1);
		});

		it("Can't update startDate and endDate In Progress State", () => {
			// Arrange
			const startDate = new Date("2023-03-22");
			const endDate = new Date("2023-04-05");

			// Act
			const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;

			releaseSprint.state.inProgress(sm);

			releaseSprint.startDate = new Date("2022-05-23");
			releaseSprint.endDate = new Date("2022-07-23");
			console.log(releaseSprint.startDate);
			console.log(releaseSprint.endDate);

			// Assert
			expect(releaseSprint.startDate).toEqual(startDate);
			expect(releaseSprint.endDate).toEqual(endDate);
		});

		it("ReleaseSprint state to FinishState", () => {
			// Arrange
			const startDate = new Date("2023-03-05");
			const endDate = new Date("2023-03-30");

			// Act
			const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
			const devPipeline = new DevelopmentPipeline(DUMMY_STRING);

            var git = new Folder("git");
            git.addComponent(new Commando("git clone xxxxx"))
            git.addComponent(new Commando("git checkout xxxxx"))
            var nodeJs = new Folder("nodejs");
            nodeJs.addComponent(new Commando("npm install"))
            nodeJs.addComponent(new Commando("npm run build"))
            var docker = new Folder("docker");
            docker.addComponent(new Commando("docker build"))
            docker.addComponent(new Commando("docker run"))

			// Act
            devPipeline.addJob(git);
            devPipeline.addJob(nodeJs);
            devPipeline.addJob(docker);
            releaseSprint.setPipeline(devPipeline);
			releaseSprint.state.inProgress(sm);
			releaseSprint.state.finished();
			releaseSprint.state.release(false)

			// Assert
			expect(releaseSprint.state instanceof CompletedState).toBe(true);
		});

		
	});
});