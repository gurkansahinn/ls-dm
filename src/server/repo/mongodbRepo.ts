import { Collection, Db, MongoClient } from "mongodb";
import { injectable } from "tsyringe";
import { MUUID, from } from "uuid-mongodb";
import { Account } from "../domain/player/account";
import { Repo } from "./repo";
import { mapMongoDBAccount } from "./utils/mapMongoDBAccount";

export type MongoDBCollection<T extends { id: string }> = Omit<T, "id"> & { _id: MUUID };
export type AccountCollection = MongoDBCollection<Account>;

@injectable()
export class MongoDBRepo implements Repo {
  private readonly client: MongoClient;
  private readonly db: Db;

  private readonly accountCollection: Collection<AccountCollection>

  constructor(client: MongoClient, dbName: string) {
    this.client = client;
    this.db = client.db(dbName);

    this.accountCollection = this.db.collection<AccountCollection>("accounts");
  }

  async createAccount({ id, ...rest }: Account): Promise<Account> {
    const accountCollection: AccountCollection = {
      ...rest,
      _id: from(id),
    };

    await this.accountCollection.insertOne(accountCollection);

    return mapMongoDBAccount(accountCollection);
  }

  async getAccountByName(name: string): Promise<Account | undefined> {
    const accountCollection = await this.accountCollection.findOne({ name });

    if (!accountCollection) {
      return undefined;
    }

    return mapMongoDBAccount(accountCollection);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}