export type Challenge = {
    id: string,
    name: string,
    description: string,
    durationDays: number,
    type: string,
    price: number
  };
  
export type AssignedChallenge = {
    id: string,
    userId: string,
    challengeId: string,
    startDate: string,
    endDate: string,
    subStatus: boolean[],
    completed: boolean,
    finished: boolean,
    amountSaved: number,
    difficulty: string
}
  
export type ActiveChallenge = {
    challenge: Challenge,
    assignedChallenge: AssignedChallenge,
  }
