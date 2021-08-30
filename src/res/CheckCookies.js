import {Redirect} from 'react-router-dom'
import API from './API'

const CheckCookies = async () => {


        const session = API.user.getId()
        console.log("cookies-session",session)
        if(session === null)
            {
                return false
            }
        else
            {
                await API.langs.setLocalLangs()
                return true
            }
    try{

    } catch (err) {
        // Trigger if there is a problem reading the cookies
        console.error(err)
    }   

}


export default CheckCookies;