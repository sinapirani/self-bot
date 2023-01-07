import { NewMessageEvent } from "telegram/events";
import { client } from '../src/app'



export const pingCommand = async(event: NewMessageEvent) => {
    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber();
    const replyToMsgId = message.replyToMsgId;


    if(message.text != "ping") return
    // if sender is not admin exit
    if(senderId?.toJSNumber() != process.env.ADMIN) return;


    client.sendMessage(chatid!,{
        message: "Working...",
        replyTo: replyToMsgId
    })
    

}