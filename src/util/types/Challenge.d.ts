export type Challenge = {
    id: number,
    timeLimit: Date,
    name: string,
    description: string,
    completionTime: Date,
    userSucceeded: boolean,
    finished: boolean,
    price: number,
    subchallenges: List<Challenge>
    parent_id: number,
}
