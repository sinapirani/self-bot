import { Database } from "../../src/app"
import { userExist } from "./userExist"




export const userAdd = async(id: number) => {

    if(await userExist(id)){
        return 
    }
    await Database.users.insertOne({id})

}