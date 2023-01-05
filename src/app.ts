import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { updateBio } from "../modules/updateBio";
const input = require("input"); // npm i input
import dotenv from 'dotenv'
import { sayHello } from "../modules/sayHello";
import { MongoClient } from "mongodb";
import { env } from "process";
import { getNewMessages } from "../events/events";
// import { S3Client } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk'

// import { mongoClient } from "../database/db";
dotenv.config();

const apiId = 1152348;
const apiHash = "6625a66ed1548b6ff66b66794ff51ed3";
const stringSession = new StringSession(
  "1BAAOMTQ5LjE1NC4xNjcuOTEAUHmCtA3+q9Mrp4OHKslOT1hP05ESiHBwCehx/yRXKOIjdSLYGHqZjXu7zG0RZVOTCaVURnxYHpDYdbdpt9PGohril14UAukQBoWT79QmtL89yDbpK93FEaB19M/U5ix9JRdFnjS0acFCGjo4R0ITvjhqHVM/PM57VQy7wsPJFoVLJLkYCW47WM9j7qKOlzg7cueQYHnG1m2b0/dlHzEl2AIJtAlcBZfJF0MgUUgbsIL0UhPhUpZ2hgEv4wYBaUpXbEcZ/Re9pwXm6rMgmAPRTd1+HUza8XZqcZArnpg8R10RZbm/3LP+Do870uZ6lyzrqEuUxKRYkjFG71NemWg9x0M="
); // fill this later with the value from session.save()
export const mongoClient = new MongoClient(env.MONGODB_URI!);
export const Database = {
  users: mongoClient.db(env.DB_NAME).collection("users"),
  messages: mongoClient.db(env.DB_NAME).collection("messages")
}

const AWS_CONFIG = {
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  accessSecretKey: process.env.LIARA_SECRET_KEY,
}
AWS.config.update(AWS_CONFIG)
export const S3Client = new AWS.S3()

export const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5, 
});



(async () => {
    
    await mongoClient.connect()
    await client.connect() 

    await updateBio()
    getNewMessages()
    
  
})();
