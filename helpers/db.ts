import { MongoClient } from "mongodb";

export async function connectToDatabase(){
  const client = await MongoClient.connect(process.env.MONGO_URL as string);

  return client;
}