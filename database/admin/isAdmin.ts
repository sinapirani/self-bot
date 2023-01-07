import { Database } from "../../src/app"


export const isAdmin = async(id: number) => {

    try{
        const isAdmin = await Database.admins.findOne({id})
        if(isAdmin) return true
        return false
    }
    catch(e){
        console.log(e);
        
    }

}