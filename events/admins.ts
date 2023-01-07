import { NewMessageEvent } from "telegram/events";



export const adminsCommand = async(event: NewMessageEvent) => {

    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber();
    const replyToMsgId = message.replyToMsgId;

    


}