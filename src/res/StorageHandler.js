class StorageHandler {
    static instance = new StorageHandler()

    loadSession = () => {
        const session = localStorage.getItem('session-token')
        if(session !== null) 
            return true
        else
            return false
    }
}

export default StorageHandler;