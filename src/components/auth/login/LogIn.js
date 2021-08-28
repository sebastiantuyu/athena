import React,{useState} from 'react'
import Logo from '../../logo/Logo'


export default function LogIn({goSignUp}) {

        
    const [state, setState] = useState({
        username:"",
        password:""
    })


    const [error, setError] = useState({
        status:false,
        description:""
    })

    const setText = (to,text) => {
        // Post-processing user and password

        if (to === 'username')
            setState({username:text.target.value})
        else if (to === 'password')
            setState({password:text.target.value})
    }

    const logIn = () => {
        
        //Request to the API for login
        
        
    }


    return (
        <div className="auth-logg-main shadow-lg d-flex j-center f-column j-start">
            <div class="auth-logo d-flex j-center">
                <Logo dark/>
            </div>
    
            <div class="auth-form d-flex f-column a-center">
                <input  type="text" placeholder="Usuario de Torre" class="auth-f-item shadow" 
                        onChange={(text) => setText('username',text)}/>

                <input  type="password" placeholder="Contraseña" class="auth-f-item shadow"
                        onChange={(text) => setText('username',text)}/>

                <div onClick={goSignUp} className="auth-signup">
                    Crear cuenta
                </div>

                <div className="auth-f-item auth-button d-flex center-center shadow" onClick={logIn}>
                    Iniciar sesion
                </div>
            </div>

        </div>
    )
}
