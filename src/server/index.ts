import 'reflect-metadata';

import { config } from "dotenv";
import { container } from "tsyringe";
import { RageEventStreamListener } from "./eventStream/rageEventStreamListener";
import { ServiceIdentify } from "./serviceIdentify";
import createMongodb from './mongodb';
import { MongoDBRepo } from './repo/mongodbRepo';

config();

async function main() {
  mp.world.time.set(21, 0, 0);

  const dbName = process.env.DB_NAME || 'amper-dm';
  const mongoClient = await createMongodb();
  const repo = new MongoDBRepo(mongoClient, dbName);

  container.registerInstance(ServiceIdentify.Repo, repo);
  container.register(ServiceIdentify.EventStreamListener, RageEventStreamListener);
  container.resolve(ServiceIdentify.EventStreamListener);
}

main();