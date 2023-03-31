import { User } from "../../../users/user";
import { ReleaseSprint } from "../releaseSprint";

export interface IReleaseSprintState {
	sprint: ReleaseSprint;

	created(): void;
	inProgress(user: User): void;
	finished(): void;
	release(restartPipeline: boolean): void;
	completed(): void;
    cancelled(): void;
}