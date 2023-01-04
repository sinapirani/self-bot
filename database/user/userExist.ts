import { mongoClient } from "../../src/app";
import { env } from "process";



export const userExist = async(id: number) => {

    let exist;
    try{
        const result = await mongoClient.db(env.DB_NAME).collection("users").findOne({id})
        if(result) exist = true
    }
    catch(e){
        exist = false
    }

    return exist

} 