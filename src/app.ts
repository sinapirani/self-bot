import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { updateBio } from "../modules/updateBio";
const input = require("input"); // npm i input
import dotenv from "dotenv";
import { sayHello } from "../modules/sayHello";
import { MongoClient } from "mongodb";
import { env } from "process";
import { getNewMessages } from "../events/events";
// import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import express, { Request, Response } from "express";
const app = express();

// import { mongoClient } from "../database/db";
dotenv.config();

const apiId = +process.env.API_ID!;
const apiHash = process.env.API_HASH!;
const stringSession = new StringSession(process.env.SESSION!); // fill this later with the value from session.save()
export const mongoClient = new MongoClient(env.MONGODB_URI!);
export const Database = {
  users: mongoClient.db(env.DB_NAME).collection("users"),
  messages: mongoClient.db(env.DB_NAME).collection("messages"),
};

export const S3Client = new AWS.S3({
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
});

export const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

(async () => {
  await mongoClient.connect();
  await client.connect();

  // setInterval(async() => {
  //   await updateBio()
  // }, 315000);
  console.log('Conected');
  setInterval(() => {
    client.sendMessage("me",{message: "Working"})
  }, 3600000  )
  
  getNewMessages();
})();

app.get("/", (req: Request, res: Response) => {
   res.json({
    seccess: true
   })
});
app.listen(process.env.PORT || 3000);
