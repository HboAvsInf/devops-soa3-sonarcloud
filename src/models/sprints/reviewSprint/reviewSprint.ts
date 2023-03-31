import { Sprint } from "../sprint";
import { CreatedState } from "./states/createdState";
import { FinishedState } from "./states/finishedState";
import { InProgressState } from "./states/inProgressState";
import { IReviewSprintState } from "./states/IReviewSprintState";

export class ReviewSprint extends Sprint {
    private _state: IReviewSprintState
    private _uploadedSummary: boolean

    constructor(sprintNumber: number, startDate: Date, endDate: Date) {
        super(sprintNumber, startDate, endDate);
        this._state = new CreatedState(this)
    }

    public Reviewed(): void {
        this._uploadedSummary = true;
    }

    public IsSprintCreated(): boolean {
        return this._state instanceof CreatedState;
    }
    public IsSprintFinished(): boolean {
        return this._state instanceof FinishedState
    }

    //Getters and Setters
    public get state(): IReviewSprintState {
        return this._state;
    }
    public set state(State: IReviewSprintState) {
        this._state = State;
    }

    public get uploadedSummary(): boolean {
        return this._uploadedSummary;
    }
    public set uploadedSummary(uploadedSummary: boolean) {
        this._uploadedSummary = uploadedSummary;
    }
}