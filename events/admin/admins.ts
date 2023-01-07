import { NewMessageEvent } from "telegram/events";
import { TEXT_GENERATOR } from "../../texts/texts";
import { adminsAddModule } from "./admins.add";



export const adminsCommand = async(event: NewMessageEvent) => {

    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber();
    const replyToMsgId = message.replyToMsgId;

    const command = message.text.split(" ")
    if(command[0] != TEXT_GENERATOR.addAdmin.COMMANDS.command) return 

    if(command[1] == TEXT_GENERATOR.addAdmin.COMMANDS.add.command){
        await adminsAddModule(event, command)
    }
    


}