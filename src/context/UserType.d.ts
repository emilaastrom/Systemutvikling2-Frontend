export type User = {
  id: number | null;
};

export type Token = string;

export type AuthState = {
  token: Token | null;
};

export type AuthContextType = {
  token: Token | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string
  ) => Promise<void>;
};
