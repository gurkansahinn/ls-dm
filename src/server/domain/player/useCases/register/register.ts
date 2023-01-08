import { Repo } from "src/server/repo/repo";
import { ServiceIdentify } from "src/server/serviceIdentify";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { Account } from "../../account";
import { AlreadyCreatedAccountError } from "./errors/alreadyCreatedAccountError";

@injectable()
export class PlayerRegister {
  private readonly repo: Repo;

  constructor(@inject(ServiceIdentify.Repo) repo: Repo) {
    this.repo = repo;
  }

  async exec(name: string, password: string): Promise<Account> {
    const alreadyCreatedAccount = await this.repo.getAccountByName(name);
    if (alreadyCreatedAccount) {
      throw new AlreadyCreatedAccountError();
    }

    const account: Account = {
      id: v4(),
      name,
      password,
    }
    return this.repo.createAccount(account);
  }
}