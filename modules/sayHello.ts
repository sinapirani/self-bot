import { NewMessage, NewMessageEvent } from "telegram/events";
import { userAdd } from "../database/user/userAdd";
import { userExist } from "../database/user/userExist";
import { client } from "../src/app";

async function sayHelloHandler(event: NewMessageEvent) {
  const message = event.message;
  const sender = await message.getSender(); 

  if (event.isPrivate) {
    const senderId = sender?.id
    senderId && console.log('user exist', await userExist(Number(senderId)))
    await userAdd(Number(senderId))
    await client.sendMessage(sender!, {
      message: `hi your id is ${message.senderId}`,
    });
  }
}

export const sayHello = () => {
  client.addEventHandler(sayHelloHandler, new NewMessage({}));
};
