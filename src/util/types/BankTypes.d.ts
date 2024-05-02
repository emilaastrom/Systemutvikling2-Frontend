export type Account = {
  id: number;
  number: string;
  type: string;
  ownerName: string;
};

export type SelectedAccounts = {
  From: Account | null;
  To: Account | null;
};
