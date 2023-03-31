import { ReleaseSprint } from "./releaseSprint/releaseSprint";
import { ReviewSprint } from "./reviewSprint/reviewSprint";
import { Sprint } from "./sprint";

export class SprintFactory {
  static createSprint(sprintType: Sprints, sprintNumber: number, startDate: Date, endDate: Date): Sprint {
    switch (sprintType) {
      case Sprints.REVIEW:
        return new ReviewSprint(sprintNumber, startDate, endDate);
      case Sprints.RELEASE:
        return new ReleaseSprint(sprintNumber, startDate, endDate);
      default:
        throw new Error("Invalid sprint type!");
    }
  }
}

export enum Sprints {
  REVIEW = 'REVIEW',
  RELEASE = 'RELEASE'
}