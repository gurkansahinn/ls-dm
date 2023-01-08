import { Account } from "src/server/domain/player/account";
import { AccountCollection } from "../mongodbRepo";

export function mapMongoDBAccount({ _id, ...rest }: AccountCollection): Account {
  return {
    id: _id.toUUID().toString(),
    ...rest,
  };
}