import React,{useState} from 'react'
import Logo from '../../logo/Logo'
import './SignUp.css'

export default function SignUp({goLogin}) {
    const [state, setState] = useState({
        fullname:"",
        username:"",
        password:"",
        passwordConf:"",
        userValidated:false,
    })

    const [error, setError] = useState({
        status:false,
        description:"",
    })

    const setText = (to,text) => {
        // Post-processing user and password

        switch(to){
            case 'username':
                break;
            case 'fullname':
                break;
            case 'password':
                break;
            case 'passwordConf':
                break;
        }
    }


    const signUp = () => {

        // User validation
        if(!state.userValidated)
        {
            setError({
                status:true, 
                description:"Porfavor, verifica tu usuario de Torre"
            })
            return null
        }

        //Password validation
        if( state.password !== state.passwordConf || 
            state.password === undefined ||
            state.password < 8) 
        {    
            setError({
                status:true,
                description:"Ups, tus contraseñas no coinciden"
            })
            return null
        }
        
    }

    const validateUser = () => {
        // Make an API request to 
        // check if the user exists 

        setState({userValidated:true})
        if(error.status)   
            setError({status:false})
    }

    return (
        <div className="auth-logg-main  auth-sign  shadow-lg d-flex j-center f-column j-start">
            <div class="auth-logo d-flex j-center">
                <Logo dark/>
            </div>
    
            <div class="auth-form d-flex f-column a-center">
                { 
                    error.status ? 
                    <span className="error">{error.description}</span>:
                    null
                }

                <input  type="text" placeholder="Nombre completo" class="auth-f-item shadow" 
                                        onChange={(text) => setText('fullname',text)}/>

                
                <div className="d-flex j-center item-info-container">
                    <input  type="text" placeholder="Usuario de Torre"  class="auth-f-item item-info shadow" 
                                            onChange={(text) => setText('username',text)}
                                            onBlur={() => validateUser()}
                                            />
                    <div className="item-info-main d-flex center-center" onClick={() => {window.location.href="https://torre.co"}}>
                        <span className="d-flex center-center">
                            ?
                        </span>
                    </div>
                
                </div>

                <input  type="password" placeholder="Contraseña" class="auth-f-item shadow"
                        onChange={(text) => setText('username',text)}/>

                <input  type="password" placeholder="Confirmar contraseña" class="auth-f-item shadow"
                                        onChange={(text) => setText('username',text)}/>

                <div onClick={goLogin} className="auth-signup">
                    Iniciar sesion
                </div>

                <div className="auth-f-item auth-button d-flex center-center shadow" onClick={() => signUp()}>
                    Crear cuenta
                </div>
            </div>

        </div>
    )
}
