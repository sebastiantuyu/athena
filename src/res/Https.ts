
class Https {
    
    static objects: Https = new Https()
    
    get = async (url:string, options:any) => {
        
        try {   
            let response

            if(options === null){
                response = await fetch(url)
            } else {
                response = await fetch(url,options)
            }
            
            return await response.json()
        } catch (error) {
            // Trigger problem on request
            console.error("GET ERROR:: ",error)
            return null
        }

    }
}

export default Https