import { Component } from "./component";
import { Visitor } from "./vistors/vistor";

export abstract class CompositeComponent extends Component {
	private _components: Array<Component>;
	private _title: string;

	constructor(title: string) {
		super();
		this.title = title;
		this.components = new Array<Component>();
	}

	public addComponent(c: Component) {
		this.components.push(c);
	}

	public acceptVisitor(visitor: Visitor) {
		this.components.forEach((c) => {
			c.acceptVisitor(visitor);
		});
	}

    public get components(): Array<Component> {
        return this._components;
    }
    public set components(value: Array<Component>) {
        this._components = value;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
}
