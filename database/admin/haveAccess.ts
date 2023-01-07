import { Database } from "../../src/app"
import { ADMIN_ACCESS, ADMIN_ACCESS_INTERFACE, ADMIN_ACCESS_TYPE } from "./access"

export const haveAccess = async(id: number, access:ADMIN_ACCESS_TYPE) => {

    try{
        const admin = await Database.admins.findOne({id})
        if(!admin) return false
        if(admin.access == access || admin.access == ADMIN_ACCESS.full) return true
        return false
    }
    catch(e){
        console.log(e);

    }

}