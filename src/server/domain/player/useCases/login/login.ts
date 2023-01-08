import { Repo } from "src/server/repo/repo";
import { ServiceIdentify } from "src/server/serviceIdentify";
import { inject, injectable } from "tsyringe";
import { Account } from "../../account";
import { InvalidPasswordError } from "./errors/invalidPasswordError";
import { InvalidUserError } from "./errors/invalidUserError";

@injectable()
export class PlayerLogin {
  private readonly repo: Repo;

  constructor(@inject(ServiceIdentify.Repo) repo: Repo) {
    this.repo = repo;
  }

  async auth(name: string, password: string): Promise<Account> {
    const account = await this.repo.getAccountByName(name);
    if (!account) {
      throw new InvalidUserError();
    }

    if (account.password !== password) {
      throw new InvalidPasswordError();
    }

    return account;
  }
}