import { Visitor } from "./vistors/vistor";

export abstract class Component {
    public abstract acceptVisitor(visitor : Visitor) : any;
}
