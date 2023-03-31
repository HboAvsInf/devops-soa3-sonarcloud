import { Sprint } from "../sprint";
import { CreatedState } from "./states/createdState";
import { FinishedState } from "./states/finishedState";
import { IReleaseSprintState } from "./states/IReleaseSprintState";

export class ReleaseSprint extends Sprint {
	private _state: IReleaseSprintState;
	
	constructor(sprintNumber: number, startDate: Date, endDate: Date) {
		super(sprintNumber, startDate, endDate);
		this._state = new CreatedState(this);
	}

	public IsSprintCreated(): boolean {
		return this._state instanceof CreatedState;
	}
	
	public IsSprintFinished(): boolean {
        return this._state instanceof FinishedState
    }
	
	public get state(): IReleaseSprintState {
		return this._state;
	}
	public set state(value: IReleaseSprintState) {
		this._state = value;
	}
	
}
