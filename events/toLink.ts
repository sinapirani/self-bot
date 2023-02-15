import { NewMessageEvent } from "telegram/events";
import { S3Client, client } from "../src/app";
import fs from "fs";
import { ManagedUpload, PutObjectRequest } from "aws-sdk/clients/s3";
import { TEXT_GENERATOR } from "../texts/texts";
import memetype from "mime-types";
import { BigInteger } from "big-integer";

export const toLinkCommand = async (event: NewMessageEvent) => {
  const message = event.message;
  const sender = await message.getSender();
  const senderId = sender?.id;
  const chatid = event.chatId?.toJSNumber();
  const replyToMsgId = message.replyToMsgId;

  //exist when command not same
  if (message.text != "~toLink") return;
  if (senderId?.toJSNumber() != process.env.ADMIN) return;

  try {
    const repliedMessages = await client.getMessages(chatid, {
      ids: replyToMsgId,
    });

    for (let repliedMessage of repliedMessages) {
      const repliedMessageMedia = repliedMessage.media!;
      console.log("repliedMessageMedia", repliedMessageMedia);
      

      let fileExt;
      //@ts-ignore
      let photoInfo = repliedMessageMedia?.photo;
      //@ts-ignore
      let documentInfo:{mimeType:string, attributes:object[any]} = repliedMessageMedia?.document;

      if (photoInfo) {
        fileExt = "jpg";
      }
      if (documentInfo) { 
        fileExt = memetype.extension(documentInfo.mimeType);
      }
      
      

      const chat = chatid;
      let progressPercent = 0;
      let tempProgressPercent = 0;


      let startMessage = await client.sendMessage(chatid!, {
        message: "Download Started ... ",
        replyTo: message.replyToMsgId,
      });
      // console.log("start Massage", startMessage);


      let uploadText;
      const progress = async (recived: BigInteger, total: BigInteger) => {
        
        progressPercent = Math.floor(
          (+recived.toString() / +total.toString()) * 100
        );
        console.log("progrece percent", progressPercent);

        if (progressPercent == tempProgressPercent) return;
        uploadText = `Upload To Server: ${progressPercent}% 🚀`;
        await client.editMessage(chat!, {
          message: startMessage.id,
          text: uploadText,
        });
        tempProgressPercent = progressPercent;
        
      };
 
      let fileBuffer = await client.downloadMedia(repliedMessage?.media!, {
        progressCallback: progress,
      });
      
      let documentFileName = documentInfo?.attributes.find((e:any) => e.fileName)
      // if(!documentFileName){
      //   return message.reply({
      //     message: "Cant Read file name!"
      //   })
      // }
      documentFileName = documentFileName ? documentFileName.fileName : `${(Math.random() * 201314)}`
      console.log('documentFileName', documentFileName);
      
      const fileKey = `${ documentFileName + Math.floor(Math.random() *10)}.${fileExt}`;
      const s3ObjParams: PutObjectRequest = {
        Body: fileBuffer,
        Bucket: process.env.LIARA_BUCKET_NAME!,
        Key: fileKey,
      };

      await S3Client.putObject(s3ObjParams).promise()
      await client.editMessage(chatid!, {
        message: startMessage.id,
        text: TEXT_GENERATOR.downloadLinkText(uploadText, fileKey),
      });
    }
  } catch (e) {
    console.log(e);
  }
};
