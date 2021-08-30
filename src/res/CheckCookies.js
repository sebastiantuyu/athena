import {Redirect} from 'react-router-dom'
import API from './API'

const CheckCookies = () => {

    try{

        const session = API.user.getId()
        if(session === null)
            return false
        else
            return true
        
    } catch (err) {
        // Trigger if there is a problem reading the cookies
        console.error(err)
    }   

}


export default CheckCookies;