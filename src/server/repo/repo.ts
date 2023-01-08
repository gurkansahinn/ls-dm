import { Account } from "../domain/player/account";

export interface Repo {
  createAccount(account: Account): Promise<Account>;
  getAccountByName(name: string): Promise<Account | undefined>;

  close(): Promise<void>;
}