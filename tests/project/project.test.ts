import { ProductBacklog } from "../../src/models/productBacklogItem/productBacklog";
import { ProductBacklogItem } from "../../src/models/productBacklogItem/productBacklogItem";
import { Project } from "../../src/models/project";
import { DoingState } from "../../src/models/tasks/states/doingState";
import { TodoState } from "../../src/models/tasks/states/todoState";
import { Task } from "../../src/models/tasks/task";
import { Developer } from "../../src/models/users/developer";
import { ProductOwner } from "../../src/models/users/productOwner";
import { ScrumMaster } from "../../src/models/users/scrumMaster";
import { Tester } from "../../src/models/users/tester";

describe("Project Tests", () => {
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

	describe("Create Project Tests", () => {
        test('Create a new project and check its name', () => {
            // Arrange
           
            const project = new Project('SOFA3', 'SOA3 van Arno');
        
            // Assert
            expect(project.projectName).toEqual('SOFA3');
          });
        
          test('Create a new project and check its version', () => {
            // Arrange
            const project = new Project('SOFA3', 'SOA3 van Arno');
        
            // Assert
            expect(project.projectVersion).toEqual('1.0');
          });
        
          test('Add a product owner to a project', () => {
            // Arrange
            const project = new Project('SOFA3', 'SOA3 van Arno');
          
            // Act
            project.productOwner = productOwner;
        
            // Assert
            expect(project.productOwner).toEqual(productOwner);
          });
        });
});