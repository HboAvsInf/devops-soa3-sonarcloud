import { ProductBacklog } from "./productBacklogItem/productBacklog";
import { Sprint } from "./sprints/sprint";
import { ProductOwner } from "./users/productOwner";

export class Project {
	private _projectName: string;
	private _projectDescription: string;
	private _projectVersion: string;
	private _productOwner: ProductOwner;
	private _productBacklog: ProductBacklog;
	private _sprint: Sprint[];

	public constructor(projectName: string, projectDescription: string) {
		this._projectName = projectName;
		this._projectDescription = projectDescription;
		this._projectVersion = "1.0";
		this._sprint = []
	}



	public addSprintToProject(sprint: Sprint): void {
		this._sprint.push(sprint);
	}

	//Getters and Setters
	public get productOwner(): ProductOwner {
		return this._productOwner;
	}

	public set productOwner(value: ProductOwner) {
		this._productOwner = value;
	}

	public get projectName(): string {
		return this._projectName;
	}
	public set projectName(projectName: string) {
		this._projectName = projectName;
	}

	public get projectDescription(): string {
		return this._projectDescription;
	}
	public set projectDescription(projectDescription: string) {
		this._projectDescription = projectDescription;
	}

	public get projectVersion(): string {
		return this._projectVersion;
	}
	public set projectVersion(newVersion: string) {
		this._projectVersion = newVersion;
	}

	
    public get productBacklog(): ProductBacklog {
        return this._productBacklog;
    }

    public set productBacklog(productBacklog: ProductBacklog) {
        this._productBacklog = productBacklog;
    }

	public get sprint(): Sprint[] {
        return this._sprint;
    }

    public set sprint(sprint: Sprint[]) {
        this._sprint = sprint;
    }
}
