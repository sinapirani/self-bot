import { NewMessageEvent } from "telegram/events";
import { S3Client, client } from "../src/app";
import fs from 'fs'
import { ManagedUpload, PutObjectRequest } from "aws-sdk/clients/s3";


export const toLinkCommand = async(event:NewMessageEvent) => {
    const message = event.message;
    const sender = await message.getSender();
    const senderId = sender?.id;
    const chatid = event.chatId?.toJSNumber()
    const replyToMsgId = message.replyToMsgId

    //exist when command not same
    if(message.text != '~toLink') return;

    const repliedMessages = await client.getMessages(chatid,{
        ids: replyToMsgId
    })
    const repliedMessage = repliedMessages[0]

    await client.sendMessage(chatid!, {
        message: "Download Started ... ",
        replyTo: message.replyToMsgId
    })

    let fileBuffer = await client.downloadMedia(repliedMessage?.media!)
    const s3ObjParams:PutObjectRequest = {
        Body: fileBuffer,   
        Bucket: process.env.LIARA_BUCKET_NAME!,
        Key: "wr23fsdf"
    }

    try{
        await S3Client.putObject(s3ObjParams).promise()
    } 
    catch(e){
        console.log(e);
    } 

}