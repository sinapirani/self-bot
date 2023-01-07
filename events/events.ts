import { NewMessage, NewMessageEvent } from "telegram/events";
import { userAdd } from "../database/user/userAdd";
import { userExist } from "../database/user/userExist";
import { client } from "../src/app";
import { toLinkCommand } from "./toLink";
import { saveMessage } from "../database/message/saveMessage";
import {pingCommand} from './ping'



async function sayHelloHandler(event: NewMessageEvent) {
  const message = event.message;
  const sender = await message.getSender();
  const senderId = sender?.id;
  const chatid = event.chatId?.toJSNumber()


  senderId && await userExist(Number(senderId))
  
  //@ts-ignore
  // saveMessage(message.id, message.text, message.date, message.fromId?.userId, message.peerId?.channelId, message.mentioned, message.fromScheduled, message.replyTo)
  await toLinkCommand(event)
  pingCommand(event)

  console.log('new message');
  

}

export const getNewMessages = () => {
  client.addEventHandler(sayHelloHandler, new NewMessage({}))
};
