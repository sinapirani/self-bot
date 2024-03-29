import { Database, client } from "../../src/app";
import { TEXT_GENERATOR } from "../../texts/texts";
import { ADMIN_ACCESS } from "./access";
import { haveAccess } from "./haveAccess";

export const addAdmin = async (
  id: number,
  senderId: number,
  messageId: any,
  chatId: any
) => {
  try {
    if (!(await haveAccess(senderId, ADMIN_ACCESS.full))) {
      return await client.sendMessage(chatId!, {
        message: TEXT_GENERATOR.addAdmin.accessDenied,
        replyTo: messageId,
      });
    }

    if (!(await haveAccess(id, ADMIN_ACCESS.full))) {
      return await client.sendMessage(chatId!, {
        message: TEXT_GENERATOR.addAdmin.alreadyAdmin,
        replyTo: messageId,
      });
    }

    const isAdmined = await Database.admins.insertOne({id, date: new Date()})
    if(isAdmined){
        return await client.sendMessage(chatId, {
            message: TEXT_GENERATOR.addAdmin.admined,
            replyTo: messageId
        })
    }
    
  } catch (e) {
    console.log('error in add admin', e);
    return await client.sendMessage(chatId!, {
        message: TEXT_GENERATOR.addAdmin.ERROR,
        replyTo: messageId
    })
  }
};
