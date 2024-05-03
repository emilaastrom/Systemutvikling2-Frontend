export type Goal = {
    id: string,
    name: string,
    description: string,
    amount: number,
    progress: number,
    deadline: Date,
    completionTime: Date,
    active: boolean,
    username: string,
}
