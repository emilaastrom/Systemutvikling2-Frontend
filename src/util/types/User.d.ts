export type User = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  defaultDifficulty: Difficulty,
  options: Option[],
};
