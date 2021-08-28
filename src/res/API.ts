interface CRUD {
    
    create: Function;
    read: Function;
    update: Function;
    delete: Function;
}


class User implements CRUD {
    static objects: User = new User();

    read = () => {

    }

    create = () => {

    }

    update = () => {

    }

    delete = () => {

    }

}

class API {
    static user: User = new User();

}

export default API;