import { Api } from 'telegram'
import {client} from '../src/app'
import moment from 'moment'
import momentTimeZone from 'moment-timezone'


export const updateBio = async() => {

    moment().utcOffset(210)
    let time = moment().toObject()
    const result = await client.invoke(new Api.account.UpdateProfile({
        about: `I SEE YOU:) ${time.hours}:${time.minutes}`
    }))
    console.log('bio updated!');
    

}