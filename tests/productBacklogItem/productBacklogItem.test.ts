import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { DoingState } from "../../src/models/productBacklogItem/states/doingState";
import { DoneState } from "../../src/models/productBacklogItem/states/doneState";
import { ReadyForTestingState } from "../../src/models/productBacklogItem/states/readyForTestingState";
import { TestedState } from "../../src/models/productBacklogItem/states/testedState";
import { TestingState } from "../../src/models/productBacklogItem/states/testingState";
import { TodoState } from "../../src/models/productBacklogItem/states/todoState";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";

describe("ProductBacklog Item test", () => {
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

	describe("Assign Developer to UserStory", () => {
		it("Developer should be assigned to a user story", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);
			pbi.specifyDeveloper(dev);

			expect(pbi.developer).not.toBeNull();
		});

		it("State of new ProductBacklogItem is ToDoState", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(TodoState);
		});

		it("ProductBacklogItem from ToDoState to DoingState", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Act
			pbi.productBacklogItemState.doing();

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(DoingState);
		});

		it("ProductBacklogItem from ToDoState to ReadyForTestingState", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Assert
			expect(() => pbi.productBacklogItemState.readyForTesting(dev)).toThrow(Error("This is not correct way"));
		});

		it("ProductBacklogItem from DoingState to ReadyForTesting", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Act
			pbi.productBacklogItemState.doing();
		
			pbi.productBacklogItemState.readyForTesting(dev);
	

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(ReadyForTestingState);
		});

		it("ProductBacklogItem from ReadyForTesting to Testing", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Act
			pbi.productBacklogItemState.doing();

			pbi.productBacklogItemState.readyForTesting(dev);

			pbi.productBacklogItemState.testing();

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(TestingState);
		});

		it("ProductBacklogItem from Testing to Tested", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Act
			pbi.productBacklogItemState.doing();
	
			pbi.productBacklogItemState.readyForTesting(dev);
		
			pbi.productBacklogItemState.testing();
	
			pbi.productBacklogItemState.tested();
		

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(TestedState);
		});

		it("ProductBacklogItem from Tested to Done", () => {
			// Arrange

			const pbi = new ProductBacklogItem("Hello World!", 5);

			//Act
			pbi.productBacklogItemState.doing();
	
			pbi.productBacklogItemState.readyForTesting(dev);
	
			pbi.productBacklogItemState.testing();
	
			pbi.productBacklogItemState.tested();
			
			pbi.productBacklogItemState.done(dev);
		

			//Assert
			expect(pbi.productBacklogItemState).toBeInstanceOf(DoneState);
		});
	});
});
