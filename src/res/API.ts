import Https from "./Https";

const rootUrl: string = "https://3afd06b4-1920-435d-9ba3-3989ce6bf57b.mock.pstmn.io/api/"



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

}

class API {
    
    static user: User = new User(rootUrl);

}

export default API;