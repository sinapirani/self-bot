import { Database } from "../../src/app"
import { userExist } from "./userExist"




export const userAdd = async(id: number, first_name:string, last_name: string, username: string, date: any) => {

    if(await userExist(id)){
        return 
    }
    await Database.users.insertOne({id})

}