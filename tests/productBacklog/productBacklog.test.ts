import { ProductBacklog } from "../../src/models/productBacklogItem/productBacklog";
import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { DoingState } from "../../src/models/tasks/states/doingState";
import { TodoState } from "../../src/models/tasks/states/todoState";
import { Task } from "../../src/models/tasks/task";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";

describe("Product Backlog Tests", () => {
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

	describe("Create a productbacklog and fill it productbacklogItem get orderd list back", () => {
		it("should get order list based on storypoints order", () => {
			// Arrange

            const pbi: ProductBacklogItem[] = []
			
			const pb = new ProductBacklog(pbi)

            const pbiI = new ProductBacklogItem("Hello World 1", 2)
            const pbiII = new ProductBacklogItem("World Create!", 5)
            pb.addItemToProductBacklog(pbiI)
            pb.addItemToProductBacklog(pbiII)

			// Assert
            expect(pb.getProductBacklogItems()[0]).toEqual(pbiII);
		});
	});

});
