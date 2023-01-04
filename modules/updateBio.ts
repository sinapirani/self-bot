import { Api } from 'telegram'
import {client} from '../src/app'


export const updateBio = async() => {

    const result = await client.invoke(new Api.account.UpdateProfile({
        about: `${new Date()}`
    }))
    console.log('bio updated!');
    

}