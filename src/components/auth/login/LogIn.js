import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import Waiting from '../../../assets/svgs/walking.svg'
import API from '../../../res/API'
import Logo from '../../logo/Logo'


export default function LogIn({goSignUp}) {

    const [redirect, setRedirect] = useState(false)
        
    const [state, setState] = useState({
        username:"",
        password:"",
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

    const logIn = async () => {
        
        //Request to the API for login
        const [status,data] = await API.user.logAsGuest()
        console.log(status,data)
        if(status === true) {
            setRedirect(true)
        }
        
    }


    return (
        <div className="auth-logg-main shadow-lg d-flex j-center f-column j-start">
            { redirect ? <Redirect push to="/home"/>  : null }
            <div class="auth-logo d-flex j-center">
                <Logo dark/>
            </div>
    
            <div class="auth-form d-flex f-column a-center">
                <span>Con TorreMatch puedes conocer a tus futuros co-founders</span>
                <img src={Waiting} alt="" className="cover-logo"/>
                <div className="auth-f-item auth-button d-flex center-center shadow guest" onClick={logIn}>
                    Iniciar como invitado
                </div>
            </div>

        </div>
    )
}
