import Https from "./Https";

const rootUrl: string = "http://192.168.0.13:8000/api/"



interface CRUD {
       
    create: Function;
    read: Function;
    update: Function;
    delete: Function;
}


class User implements CRUD {
    
    url: string;

    constructor (parentUrl:string) {
        this.url = parentUrl + "users/"; 
    }

    read = async () => {
        const response = await Https.objects.get(this.url+"login/","")        
        if(response) {
            return true
        }
    }

    create = () => {

    }

    update = () => {

    }

    delete = () => {

    }

    readPreferences = async (id:Number) => {

        const response = await Https.objects.get(rootUrl+
                                                "preferences/get-all/?id="+id,{
                                                    method:'GET',
                                                })
        try {
            if(response.status) {
                return response.data
            }                
        } catch (error) {
            console.error(error)
        }
    }

}

class Langs {
    getAll: Function = () => {
        return localStorage.getItem('local-langs')
    }

    setLocalLangs: Function = async () => {
        
        if(localStorage.getItem('local-langs') === null)
        {
            const data = await Https.objects.get(rootUrl+"preferences/lang/all/",{
                                                    method:'GET'})
            if (data.status){
                localStorage.setItem("local-langs",data.data)
            }
        }
    }
}

class API {
    
    static user: User = new User(rootUrl);
    static langs: Langs = new Langs();

}

export default API;