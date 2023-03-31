export class SprintReportComponent {
	private _logo: string;
	private _projectName: string;
	private _businessName: string;
	private _version: number;
	private _date: Date;

	public constructor(logo: string, projectName: string, businessName: string, version: number, date: Date) {
		this._logo = logo;
		this._projectName = projectName;
		this._businessName = businessName;
		this._version = version;
		this._date = date;
	}

	public toString(): string {
		return `${this._logo} ${this._businessName} \n projectName: ${this._projectName}, version: ${this._version}, date: ${this._date}`;
	}

	//Getters and Setters
	public get logo(): string {
		return this._logo;
	}
	public set logo(logo: string) {
		this._logo = logo;
	}

	public get projectName(): string {
		return this._projectName;
	}
	public set projectName(projectName: string) {
		this._projectName = projectName;
	}

	public get businessName(): string {
		return this._businessName;
	}
	public set businessName(businessName: string) {
		this._businessName = businessName;
	}

	public get version(): number {
		return this._version;
	}
	public set version(version: number) {
		this._version = version;
	}

	public get date(): Date {
		return this._date;
	}
	public set date(date: Date) {
		this._date = date;
	}
}
