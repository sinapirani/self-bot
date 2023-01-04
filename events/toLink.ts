import { NewMessageEvent } from "telegram/events";
import { client } from "../src/app";



export const toLinkCommand = async(event:NewMessageEvent) => {
    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber()

    //exist when command not same
    if(message.text != '~toLink') return;

    console.log("id of replied message", message.replyToMsgId)
    

    client.sendMessage(chatid!, {
        message: "Download Started ... ",
        replyTo: message.replyToMsgId
    })


}