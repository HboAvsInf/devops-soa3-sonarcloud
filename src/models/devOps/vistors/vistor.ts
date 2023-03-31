import { Commando } from "../commando";
import { CompositeComponent } from "../compositeComponent";
import { Folder } from "../map";
import { DevelopmentPipeline } from "../developmentPipeline";

export abstract class Visitor{
    public abstract visitPipeline(pipeline : DevelopmentPipeline): any;
    public abstract visitComponents(component : CompositeComponent) : any;
    public abstract visitCommand(command : Commando) : any;
    public abstract visitFolder(folder : Folder) : any;
}
