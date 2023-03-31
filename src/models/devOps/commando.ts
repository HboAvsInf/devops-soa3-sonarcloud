import { Component } from "./component";
import { Visitor } from "./vistors/vistor";

export class Commando extends Component {
	
	constructor(private _commandLine: string) {
		super();
	}

	public acceptVisitor(visitor: Visitor) {
		visitor.visitCommand(this);
	}

    public get commandLine(): string {
        return this._commandLine;
    }

    public set commandLine(commandLine: string) {
        this._commandLine = commandLine;
    }

}
