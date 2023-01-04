import { NewMessage, NewMessageEvent } from "telegram/events";
import { userAdd } from "../database/user/userAdd";
import { userExist } from "../database/user/userExist";
import { client } from "../src/app";
import { toLinkCommand } from "./toLink";

async function sayHelloHandler(event: NewMessageEvent) {
  const message = event.message;
  const sender = await message.getSender();
  const senderId = sender?.id;
  const chatid = event.chatId?.toJSNumber()

  senderId && console.log("user exist", await userExist(Number(senderId)));
  await userAdd(Number(senderId));


  await toLinkCommand(event)


}

export const getNewMessages = () => {
  client.addEventHandler(sayHelloHandler, new NewMessage({}));
};
