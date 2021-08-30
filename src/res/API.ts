import Https from "./Https";

const rootUrl: string = "https://torre-backend-demo.herokuapp.com/api/"


class User {
    
    url: string;
    id: Number;

    constructor (parentUrl:string) {
        this.url = parentUrl + "users/"; 
        this.id = 0;
    }

    private setId = (id:Number) => {
        try {
            localStorage.setItem("session-id",id.toString())
            this.id = id
            return true
        } catch (error) {
            console.error(error)
            return null
        }   
    }

    private onResponse = (response:any) => {
        if(response !== null){
            if(response.status === true)
            {
                return [true,response.data]
            }
            else return [false,null]
        } else return [false,null]
    }


    getId = () => { 
        return localStorage.getItem("session-id")
     }

    logAsGuest = async () => {
        const response = await Https.objects.get(this.url
                                                 +"login-as-guest/",
                                                {
                                                    method:"POST"
                                                })   
        if (response.status) {
            this.setId(response.data['id'])
        }                                                
        return this.onResponse(response)
    }

    match = async (id:Number,userInfo:any) => {

        const body = new FormData()
        body.append("name",userInfo.name)
        body.append("username",userInfo.username)
        body.append("image",userInfo.image)

        const response = await Https.objects.get(rootUrl+
                                            `users/match/set/?id=${id}`,
                                            {
                                                method:'POST',
                                                body:body
                                            })
        return this.onResponse(response)
    }

    getMatches = async (id:Number) => {
        const response = await Https.objects.get(rootUrl+
                                                `users/match/get/?id=${id}`,{
                                                    method:'GET'
                                                })
        return this.onResponse(response)                                                
    }

    coincidences = async () => {

        const response = await Https.objects.get(rootUrl+
                                                `users/get-coincidences/?id=${this.getId()}`,
                                                {
                                                    method:'POST',
                                                 })
        return this.onResponse(response)                                                
    }

    readPreferences = async (id:Number) => {

        const response = await Https.objects.get(rootUrl+
                                                `preferences/get-all/?id=${this.getId()}`,
                                                {
                                                    method:'GET',
                                                })
        try {
            if(response.status) {
                return response.data
            }                
        } catch (error) {
            console.error("Error reading data:",error)
            console.log(response)
                return null
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

    set: Function = async (id:Number,lang:string,level:Number) => {

        const body = new FormData()
        body.append("lang", lang);
        body.append("level", level.toString());

        const response = await Https.objects.get(rootUrl+
                                                 `preferences/lang/set/?id=${id}`,
                                                 {
                                                     method:'POST',
                                                     body:body
                                                 })
        if(response.status) {
            return [true,response.data]
        } else 
            return [false,null]
    }


    delete: Function = async (id:Number) => {
        const response = await Https.objects.get(rootUrl+
                                                `preferences/lang/delete/?lang=${id}`
                                                ,{
                                                    method:'GET'
                                                })
        return response.status
    }
}

class Preferences {
    set: Function = async (id:Number,preference:string) => {
        
        const body = new FormData()
        body.append("preference",preference)

        const response = await Https.objects.get(rootUrl +
                                        `preferences/set/?id=${id}`,
                                        {
                                            method:'POST',
                                            body:body,
                                        })
        if (response.status)
            return [true,response.data]
         else 
            return [false,null]
    }

    delete: Function = async (id:Number) => {
        const response = await Https.objects.get(rootUrl+
                                                `preferences/delete/?preference=${id}`,
                                                {
                                                    method:"GET",
                                                })
        return response.status

    }
}



class API {
    
    static user: User = new User(rootUrl)
    static langs: Langs = new Langs()
    static preferences: Preferences = new Preferences()
}

export default API;