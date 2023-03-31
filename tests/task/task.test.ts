import { ProductBacklog } from "../../src/models/productBacklogItem/productBacklog";
import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { DoingState } from "../../src/models/tasks/states/doingState";
import { TestingState } from "../../src/models/tasks/states/testingState";
import { TodoState } from "../../src/models/tasks/states/todoState";
import { Task } from "../../src/models/tasks/task";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";

describe("Task Tests", () => {
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

	describe("Create a task and linked this to ProductBackLogItem", () => {
		it("should add the activity to the product backlog item and set its state to TodoState", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);
			const task = new Task("Write in VS code");

			pbi.addTaskToProductBackLogItem(task);

			// Assert
			expect(pbi.subTasks).toContain(task);
			expect(task.taskState).toBeInstanceOf(TodoState);
		});
	});

	describe("Create a task and switch from ToDo to Doing", () => {
		it("Should switch ToDo state to Doing state", () => {
			// Arrange
			const task = new Task("Write in VS code");
			// Assert
			expect(task.taskState).toBeInstanceOf(TodoState);
			task.developer = developer
			task.taskState.doing();
			expect(task.taskState).toBeInstanceOf(DoingState);
		});
	});

	describe("Create a task and switch from ToDo to Done", () => {
		it("Should give Error(You can't go from Todo to Done)", () => {
			// Arrange
			const task = new Task("Write in VS code");
			// Assert
			task.developer = developer

			// Act and Assert
			expect(task.taskState).toBeInstanceOf(TodoState);
			expect(() => task.taskState.done()).toThrow(Error("You can't go from Todo to Done "));

			task.taskState.doing()
			expect(task.taskState).toBeInstanceOf(DoingState);

		});
	});
});
