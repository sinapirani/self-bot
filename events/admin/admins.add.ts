import { NewMessageEvent } from "telegram/events";
import { haveAccess } from "../../database/admin/haveAccess";
import { ADMIN_ACCESS } from "../../database/admin/access";
import { Database, client } from "../../src/app";
import { TEXT_GENERATOR } from "../../texts/texts";


export const adminsAddModule = async(event: NewMessageEvent, command:any) => {

    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber();
    const replyToMsgId = message.replyToMsgId;

    let candidateId = await client.getMessages(chatid!, {
        ids: replyToMsgId
    })

    console.log(candidateId[0].fromId);
    
    //@ts-ignore
    candidateId = candidateId[0].fromId.userId.toJSNumber()
    console.log('this is candidate', candidateId);
    

    try{
        if(!await haveAccess(senderId?.toJSNumber()!, ADMIN_ACCESS.full)){
            return await client.sendMessage(chatid!,{
                message: TEXT_GENERATOR.addAdmin.COMMANDS.add.accessDenied,
                replyTo: message.id
            })
        }

        if(!Object.values(ADMIN_ACCESS).includes(command[2])){
            return await client.sendMessage(chatid!, {
                message: TEXT_GENERATOR.addAdmin.COMMANDS.add.invalidAccess,
                replyTo: message.id
            })
        }


        await Database.admins.insertOne({id: candidateId, access: command[2]})

        await client.sendMessage(chatid!, {
            message: TEXT_GENERATOR.addAdmin.COMMANDS.add.admined,
            replyTo: message.id
        })

    }
    catch(e){
        console.log(e);
        client.sendMessage(chatid!,{
            message: TEXT_GENERATOR.addAdmin.COMMANDS.add.ERROR,
            replyTo: message.id
        })
    }
    



}