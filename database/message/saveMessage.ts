import { Database } from "../../src/app";

interface ReplyToInterface {
    forumTopic: any;
    replyToMsgId: number;
    replyToScheduled: boolean
}

export const saveMessage = (
  messageId: any,
  message: string,
  date: any,
  senderId: bigint,
  chatId: bigint,
  mentioned: boolean,
  fromScheduled: boolean,
  replyTo: ReplyToInterface
) => {
  try {

    let chatIdString = chatId.toString()
    let senderIdString = senderId.toString()
    Database.messages.insertOne({
      messageId,
      message,
      date,
      senderIdString,
      chatIdString,
      mentioned,
      fromScheduled,
      replyTo
    });
  } catch (e) {
    console.log('error');
  }
};
