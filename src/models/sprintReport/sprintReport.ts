import { IReportBehaviour } from "./Behaviour/IReportBehaviour";
import { SprintReportComponent } from "./sprintReportComponent";

export class SprintReport {
	private _sprintNr: number;
	private _reportGenerator: IReportBehaviour;
  
    constructor(sprintNr : number, generator : IReportBehaviour, public header? : SprintReportComponent, public footer? : SprintReportComponent, public teamComposition? : string, public burndownChart? : string, public effortPoints? : string){
        this._sprintNr = sprintNr;
        this._reportGenerator = generator;
    }

    setHeader(logo : string, businessName : string, projectName : string, version : number, date: Date){
        this.header = new SprintReportComponent(logo, projectName, businessName, version, date);
    }

    setFooter(logo : string, businessName : string, projectName : string, version : number, date: Date){
        this.footer = new SprintReportComponent(logo, projectName, businessName, version, date);
    }

    setTeamComposition(teamComposition : string){
        this.teamComposition = teamComposition;
    }

    setEffortPoints(effortPoints : string){
        this.effortPoints = effortPoints;
    }

    setBurnndownChart(burndownChart : string){
        this.burndownChart = burndownChart;
    }

    generateReport(){
        this.reportGenerator.generateReport(this);
    }

    public get sprintNr(): number {
        return this._sprintNr;
    }
    public set sprintNr(value: number) {
        this._sprintNr = value;
    }

    public get reportGenerator(): IReportBehaviour {
        return this._reportGenerator;
    }
    public set reportGenerator(value: IReportBehaviour) {
        this._reportGenerator = value;
    }
}

