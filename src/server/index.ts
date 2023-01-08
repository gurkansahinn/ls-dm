import 'reflect-metadata';

import { config } from "dotenv";
import { container } from "tsyringe";
import { RageEventStreamListener } from "./eventStream/rageEventStreamListener";
import { ServiceIdentify } from "./serviceIdentify";
import createMongodb from './mongodb';
import { MongoDBRepo } from './repo/mongodbRepo';
import { Deathmatch } from './domain/deathmatch/deathmatch';
import { RageEventStreamEmitter } from './eventStream/rageEventStreamEmitter';
import { DeathmatchCommand } from './domain/deathmatch/commands';
import { WarehouseLobby } from './domain/deathmatch/lobbies/warehouse';

config();

async function main() {
  mp.world.time.set(21, 0, 0);

  const dbName = process.env.DB_NAME || 'amper-dm';
  const mongoClient = await createMongodb();
  const repo = new MongoDBRepo(mongoClient, dbName);

  container.registerInstance(ServiceIdentify.Repo, repo);

  container.register(ServiceIdentify.EventStreamEmitter, RageEventStreamEmitter);
  container.register(ServiceIdentify.EventStreamListener, RageEventStreamListener);
  container.resolve(ServiceIdentify.EventStreamListener);

  container.registerSingleton(Deathmatch);
  container.registerSingleton(WarehouseLobby);
  container.registerSingleton(DeathmatchCommand);

  container.resolve(Deathmatch);
  container.resolve(WarehouseLobby);
  container.resolve(DeathmatchCommand);
}

main();