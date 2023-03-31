import { Commando } from "../../src/models/devOps/commando";
import { DevelopmentPipeline, PipelineStatus } from "../../src/models/devOps/developmentPipeline";
import { Folder } from "../../src/models/devOps/map";
import { EmailSender } from "../../src/models/notifications/API/emailSender";
import { SlackSender } from "../../src/models/notifications/API/slackSender";
import { SMSSender } from "../../src/models/notifications/API/smsSender";
import { EmailSubscriber } from "../../src/models/notifications/emailSubscriber";
import { SlackSubscriber } from "../../src/models/notifications/slackSubscriber";
import { SmsSubscriber } from "../../src/models/notifications/smsSubscriber";
import { ProductBacklog } from "../../src/models/productBacklogItem/productBacklog";
import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { DoingState } from "../../src/models/productBacklogItem/states/doingState";

import { Project } from "../../src/models/project";
import { ReleaseSprint } from "../../src/models/sprints/releaseSprint/releaseSprint";
import { CancelledState } from "../../src/models/sprints/releaseSprint/states/cancelledState";
import { ReviewSprint } from "../../src/models/sprints/reviewSprint/reviewSprint";
import { SprintFactory, Sprints } from "../../src/models/sprints/sprintFactory";

import { TodoState } from "../../src/models/tasks/states/todoState";
import { Task } from "../../src/models/tasks/task";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";
import { User } from "../../src/models/users/user";

describe("Notifaction test", () => {
	let productOwner: ProductOwner;
	let sm: ScrumMaster;
	let ts: Tester;
	let dev: Developer;
	const DUMMY_STRING = "DUMMY";
	const DUMMY_NUMBERS = 6289022454;

	beforeAll(() => {
		jest.spyOn(global.console, "error").mockImplementation(() => {});
		jest.spyOn(global.console, "log").mockImplementation(() => {});
	});

	beforeEach(() => {
		productOwner = new ProductOwner("Arno", "Broeders", "a.broeders@avans.nl", "066223432", 20451234);
		sm = new ScrumMaster("Ruud", "Hermans", "rlm.hermans@avans.nl", "066223432", 20451234);
		ts = new Tester("Dion", "Koeze", "dj.koeze@avans.nl", "066223432", 20451234);
		dev = new Developer("Pascal", "van Gastel", "ppth.vangastel@avans.nl", "066223432", 20451234);
	});

	describe("Tester should be notify ", () => {
		it("should be notify when Doing to Read For testing state", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Hello World!", 5);
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.addTeamMember(ts);
			reviewSprint.addTeamMember(dev);
			reviewSprint.addTeamMember(sm);
			reviewSprint.addUserStoryToSprint(userStory);
			userStory.sprintBacklog = reviewSprint;
			dev.addNotificationType(new SlackSubscriber(dev.email, new SlackSender()));
			ts.addNotificationType(new SmsSubscriber(ts.phoneNumber, new SMSSender()));
			userStory.productBacklogItemState.doing();
			userStory.productBacklogItemState.readyForTesting(dev);

			// Assert
			 expect(ts.notificationTypes[0].notificationReceived).toBe(true);
		});

		it("should be notify when ready for testing to Scrumaster", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Hello World!", 5);
			const startDate = new Date("2022-03-22");
			const endDate = new Date("2022-04-05");
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

			reviewSprint.addTeamMember(ts);
			reviewSprint.addTeamMember(dev);
			reviewSprint.addTeamMember(sm);
			reviewSprint.addUserStoryToSprint(userStory);
			userStory.sprintBacklog = reviewSprint;
			sm.addNotificationType(new SmsSubscriber(sm.phoneNumber, new SMSSender()));
			userStory.productBacklogItemState.doing();
			userStory.productBacklogItemState.readyForTesting(dev);
			userStory.productBacklogItemState.todo(ts);

			// Assert
			 expect(sm.notificationTypes[0].notificationReceived).toBe(true);
		});
	});

	it("should be notify when Tested to Ready For Testing (Tester Notify)", () => {
		// Arrange
		const userStory = new ProductBacklogItem("Hello World!", 5);
		const startDate = new Date("2022-03-22");
		const endDate = new Date("2022-04-05");
		const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, startDate, endDate) as ReviewSprint;

		reviewSprint.addTeamMember(ts);
		reviewSprint.addTeamMember(dev);
		reviewSprint.addTeamMember(sm);
		reviewSprint.addUserStoryToSprint(userStory);
		userStory.sprintBacklog = reviewSprint;
		ts.addNotificationType(new EmailSubscriber(ts.email, new EmailSender()));
		userStory.productBacklogItemState.doing();
		userStory.productBacklogItemState.readyForTesting(dev);
		userStory.productBacklogItemState.testing();
		userStory.productBacklogItemState.tested();
		userStory.productBacklogItemState.readyForTesting(dev);

		// Assert
		 expect(ts.notificationTypes[0].notificationReceived).toBe(true);
	});

	it("ReleaseSprint state to FinishState", () => {
		// Arrange

		const project = new Project("Test Project", "Test Project Description");
		project.productOwner = productOwner;
		const startDate = new Date("2023-03-05");
		const endDate = new Date("2023-03-30");

		// Act
		const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
		releaseSprint.addTeamMember(ts);
		releaseSprint.addTeamMember(dev);
		releaseSprint.addTeamMember(sm);
		project.addSprintToProject(releaseSprint);
		releaseSprint.rootProject = project;
		
		sm.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		productOwner.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		const devPipeline = new DevelopmentPipeline(DUMMY_STRING);

		// Act
		releaseSprint.setPipeline(devPipeline);
		releaseSprint.state.inProgress(sm);
		releaseSprint.state.finished();
		releaseSprint.state.release(false)

		// Assert
		expect(releaseSprint.state).toBeInstanceOf(CancelledState);
		expect(releaseSprint.developmentPipeline.pipelineStatus).toBe(PipelineStatus.Failed);
		expect(sm.notificationTypes[0].notificationReceived).toBe(true);
		expect(productOwner.notificationTypes[0].notificationReceived).toBe(true);
	});

	it("ReleaseSprint state to FinishState", () => {
		// Arrange

		const project = new Project("Test Project", "Test Project Description");
		project.productOwner = productOwner;
		const startDate = new Date("2023-03-05");
		const endDate = new Date("2023-03-30");

		// Act
		const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
		releaseSprint.addTeamMember(ts);
		releaseSprint.addTeamMember(dev);
		releaseSprint.addTeamMember(sm);
		project.addSprintToProject(releaseSprint);
		releaseSprint.rootProject = project;
		
		sm.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		productOwner.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		const devPipeline = new DevelopmentPipeline(DUMMY_STRING);

		// Act
		releaseSprint.setPipeline(devPipeline);
		releaseSprint.state.inProgress(sm);
		releaseSprint.state.finished();
		releaseSprint.state.release(true)

		// Assert
		expect(releaseSprint.developmentPipeline.pipelineStatus).toBe(PipelineStatus.Failed);
		expect(sm.notificationTypes[0].notificationReceived).toBe(true);
		expect(productOwner.notificationTypes[0].notificationReceived).toBe(true);
	});


	it("ReleaseSprint state to FinishState", () => {
		// Arrange

		const project = new Project("Test Project", "Test Project Description");
		project.productOwner = productOwner;
		const startDate = new Date("2023-03-05");
		const endDate = new Date("2023-03-30");

		// Act
		const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
		releaseSprint.addTeamMember(ts);
		releaseSprint.addTeamMember(dev);
		releaseSprint.addTeamMember(sm);
		project.addSprintToProject(releaseSprint);
		releaseSprint.rootProject = project;
		
		sm.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		productOwner.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
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

		// Act
		releaseSprint.setPipeline(devPipeline);
		releaseSprint.state.inProgress(sm);
		releaseSprint.state.finished();
		releaseSprint.state.release(false)

		// Assert
		expect(releaseSprint.developmentPipeline.pipelineStatus).toBe(PipelineStatus.Succeeded);
		expect(sm.notificationTypes[0].notificationReceived).toBe(true);
		expect(productOwner.notificationTypes[0].notificationReceived).toBe(true);
	});


	it("Remove my subscription", () => {
		// Arrange

		const project = new Project("Test Project", "Test Project Description");
		project.productOwner = productOwner;
		const startDate = new Date("2023-03-05");
		const endDate = new Date("2023-03-30");

		// Act
		const releaseSprint = SprintFactory.createSprint(Sprints.RELEASE, 1, startDate, endDate) as ReleaseSprint;
		releaseSprint.addTeamMember(ts);
		releaseSprint.addTeamMember(dev);
		releaseSprint.addTeamMember(sm);
		project.addSprintToProject(releaseSprint);
		releaseSprint.rootProject = project;
		
		productOwner.addNotificationType(new EmailSubscriber(sm.email, new EmailSender()));
		productOwner.removeNotificationType(productOwner.notificationTypes[0])

		expect(productOwner.notificationTypes).toHaveLength(0);
	});


});

