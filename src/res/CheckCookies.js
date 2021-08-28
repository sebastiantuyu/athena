import StorageHandler from './StorageHandler.js'
import {Redirect} from 'react-router-dom'

const CheckCookies = () => {


    try{
        return StorageHandler.instance.loadSession();    
        
    } catch (err) {
        // Trigger if there is a problem reading the cookies
        console.error(err)
    }   

}


export default CheckCookies;