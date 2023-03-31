
import { Message } from "../../src/models/forum/Message";
import { ProductBacklog } from "../../src/models/productBacklogItem/productBacklog";
import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { DoingState } from "../../src/models/productBacklogItem/states/doingState";
import { DoneState } from "../../src/models/productBacklogItem/states/doneState";
import { ReadyForTestingState } from "../../src/models/productBacklogItem/states/readyForTestingState";

import { TestedState } from "../../src/models/productBacklogItem/states/testedState";
import { TestingState } from "../../src/models/productBacklogItem/states/testingState";
import { Project } from "../../src/models/project";
import { ReviewSprint } from "../../src/models/sprints/reviewSprint/reviewSprint";
import { SprintFactory, Sprints } from "../../src/models/sprints/sprintFactory";

import { Task } from "../../src/models/tasks/task";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";

describe("Thread Message Tests", () => {
	let productOwner: ProductOwner;
	let scrumMaster: ScrumMaster;
	let tester: Tester;
	let developer: Developer;
	const DUMMY_STRING = "DUMMY";
	const DUMMY_NUMBERS = 6289022454;

	beforeEach(() => {
		productOwner = new ProductOwner("Arno", "Broeders", "a.broeders@avans.nl", "066223432", 20451234);
		scrumMaster = new ScrumMaster("Ruud", "Hermans", "rlm.hermans@avans.nl", "066223432", 20451234);
		tester = new Tester("Dion", "Koeze", "dj.koeze@avans.nl", "066223432", 20451234);
		developer = new Developer("Pascal", "van Gastel", "ppth.vangastel@avans.nl", "066223432", 20451234);
	});

	describe("Create Thread", () => {
		it("Developer should create thread on product backlog item", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Als gebruiker wil ik een fase kunnen toekennen.", 1);
			const user = developer;
			const message = new Message("Ik heb een suggestie.", "De code moet in C#", user);

			// Act
			userStory.createThread(message);

			// Assert
			expect(userStory.thread).not.toBeNull();
			expect(userStory.thread.messages).toHaveLength(1);
		});
	});

	describe("Create Thread with multiple messages", () => {
		it("Developer should create thread on product backlog item and 2 message should be created", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Als gebruiker wil ik een fase kunnen toekennen.", 1);
			const user = developer;
			const message = new Message("Ik heb een suggestie.", "De code moet in C#", user);
			const message2 = new Message(
				"Waarom gebruiken we dit?",
				"Ik merk dat de code in C# helemaal niet werkt!",
				user
			);

			// Act
			userStory.createThread(message);
			userStory.addMessageToThread(message2);

			// Assert
			expect(userStory.thread.messages).toHaveLength(2);
		});
	});

	describe("When a thread is done message 3e message can't be send", () => {
		it("should not be able to add message to thread", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Als gebruiker wil ik een fase kunnen toekennen.", 1);
			const project = new Project("Test Project", "Leuk project");
			project.productOwner = productOwner;
			const reviewSprint = SprintFactory.createSprint(Sprints.REVIEW, 1, new Date(), new Date(2024, 1, 1)) as ReviewSprint;
			project.addSprintToProject(reviewSprint);

			project.sprint[0].teamMembers = [scrumMaster, tester, developer];
			project.sprint[0].sprintBacklog = [userStory];

			const user = developer;
			const sm = scrumMaster;
			const message1 = new Message("Ik heb een suggestie.", "De code moet in C#", user);
			const message2 = new Message(
				"Waarom gebruiken we dit?",
				"Ik merk dat de code in C# helemaal niet werkt!",
				user
			);
			const message3 = new Message("Waarom gebruiken we dit?", "Uhh wat doe ik hier?", sm);

			// Act
			userStory.createThread(message1);
			userStory.productBacklogItemState.doing();
			userStory.productBacklogItemState.readyForTesting(user);
			userStory.addMessageToThread(message2);
			userStory.productBacklogItemState.testing();
			userStory.productBacklogItemState.tested();
			userStory.productBacklogItemState.done(user);
			userStory.addMessageToThread(message3);

			// Assert
			expect(userStory.productBacklogItemState).toBeInstanceOf(DoneState);
			expect(userStory.thread.messages).toHaveLength(2);
		});
	});

	describe("Add message without thread", () => {
		it("Thread list should be null", () => {
			// Arrange
			const userStory = new ProductBacklogItem("Als gebruiker wil ik een fase kunnen toekennen.", 1);
			const user = developer;
			const message = new Message("Ik heb een suggestie.", "De code moet in C#", user);

			// Act
			userStory.addMessageToThread(message);

			// Assert
			expect(userStory.thread).toBeUndefined();
		});
	});
});
