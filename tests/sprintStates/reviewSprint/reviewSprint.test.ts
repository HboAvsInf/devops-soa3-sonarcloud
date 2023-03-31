import { ProductBacklogItem } from "../../../src/models/productBacklogItem/productBacklogItem";
import { Project } from "../../../src/models/project";
import { ReviewSprint } from "../../../src/models/sprints/reviewSprint/reviewSprint";
import { CompletedState } from "../../../src/models/sprints/reviewSprint/states/completedState";
import { CreatedState } from "../../../src/models/sprints/reviewSprint/states/createdState";
import { FinishedState } from "../../../src/models/sprints/reviewSprint/states/finishedState";
import { InProgressState } from "../../../src/models/sprints/reviewSprint/states/inProgressState";
import { SprintFactory, Sprints } from "../../../src/models/sprints/sprintFactory";
import { DoingState } from "../../../src/models/tasks/states/doingState";
import { Developer } from "../../../src/models/users/developer";
import { ProductOwner } from "../../../src/models/users/productOwner";
import { ScrumMaster } from "../../../src/models/users/scrumMaster";
import { Tester } from "../../../src/models/users/tester";

describe("ReviewSprint test", () => {
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

	describe("ReviewSprint", () => {
		it("SprintFactory should make ReviewSprint", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate);

			// Assert
			expect(reviewSprint).toBeInstanceOf(ReviewSprint);
			expect(reviewSprint.sprintNumber).toEqual(1);
			expect(reviewSprint.startDate).toEqual(startDate);
			expect(reviewSprint.endDate).toEqual(endDate);
			expect(reviewSprint.teamMembers).toEqual([]);
		});

		it("ReviewSprint in created state", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			// Assert
			expect(reviewSprint.state instanceof CreatedState).toBe(true);
		});

		it("ReviewSprint To State In Progress", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);

			// Assert
			expect(reviewSprint.state instanceof InProgressState).toBe(true);
		});

		it("Can't update sprintNumber In Progress State", () => {
			// Arrange
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);

			reviewSprint.sprintNumber = 2;

			// Assert
			expect(reviewSprint.sprintNumber).toEqual(1);
		});

		it("Can't update startDate and endDate In Progress State", () => {
			// Arrange
			const startDate = new Date("2023-03-22");
			const endDate = new Date("2023-04-05");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);

			reviewSprint.startDate = new Date("2022-05-23");
			reviewSprint.endDate = new Date("2022-05-23");
			console.log(reviewSprint.startDate);
			console.log(reviewSprint.endDate);

			// Assert
			expect(reviewSprint.startDate).toEqual(startDate);
			expect(reviewSprint.endDate).toEqual(endDate);
		});

		it("Add Member To ReviewSprint And Check ProductOwner", () => {
			// Arrange
			const project = new Project("Test Project", "Leuk project");
			const startDate = new Date("2023-03-22");
			const endDate = new Date("2023-04-05");

			// Act
			project.productOwner = productOwner;
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			project.addSprintToProject(reviewSprint);

			project.sprint[0].addTeamMember(dev);

			// Assert
			expect(project.productOwner).not.toBeNull();
			expect(project.sprint[0].teamMembers).not.toBeNull();
		});

		it("ReviewSprint state to FinishState", () => {
			// Arrange
			const startDate = new Date("2023-03-05");
			const endDate = new Date("2023-03-30");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);
			reviewSprint.state.finished();

			// Assert
			expect(reviewSprint.state instanceof FinishedState).toBe(true);
		});

		it("ReviewSprint state to FinishState", () => {
			// Arrange
			const startDate = new Date("2023-03-22");
			const endDate = new Date("2024-04-22");

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);
			reviewSprint.state.finished();

			// Assert
			expect(reviewSprint.state).toBeInstanceOf(InProgressState);
		});

		it("ReviewSprint To FinishedState Can Not Add ProductBacklog Item", () => {
			// Arrange
			const startDate = new Date("2023-03-22");
            const endDate = new Date("2023-03-30");;
			const pbi = new ProductBacklogItem("Hello World!", 5);
			const pbiII = new ProductBacklogItem("Hello World!", 5);

			// Act
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.state.inProgress(sm);
			reviewSprint.addUserStoryToSprint(pbi);
			reviewSprint.state.finished();
			reviewSprint.addUserStoryToSprint(pbiII);
			// Assert
			expect(reviewSprint.sprintBacklog.length).toEqual(1);
		});

        
		it("Full experience ReviewSprint states!", () => {
			// Arrange
			
			const startDate = new Date("2023-03-22");
			const endDate = new Date("2023-03-30");
            const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;


			reviewSprint.addTeamMember(ts);
			reviewSprint.addTeamMember(dev);
			reviewSprint.addTeamMember(sm);
		
			reviewSprint.state.inProgress(sm);
			reviewSprint.state.finished();
			reviewSprint.state.review();
			reviewSprint.state.completed(sm);
    
			// Assert
            expect(reviewSprint.state).toBeInstanceOf(CompletedState);
		});
	});
});
