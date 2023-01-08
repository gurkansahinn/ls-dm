import { MongoClient } from 'mongodb';

export default function createMongodb(): Promise<MongoClient> {
  const uri = process.env.MONGODBB_URL;

  if (!uri) {
    throw new Error('MONGODBB_URL is not defined');
  }

  return MongoClient.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
}