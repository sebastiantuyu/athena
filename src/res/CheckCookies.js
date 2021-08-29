import StorageHandler from './StorageHandler.js'
import {Redirect} from 'react-router-dom'
import API from './API.ts'

const CheckCookies = async () => {


    try{
        await API.langs.setLocalLangs()
        //return StorageHandler.instance.loadSession();    
        return true
        
    } catch (err) {
        // Trigger if there is a problem reading the cookies
        console.error(err)
    }   

}


export default CheckCookies;