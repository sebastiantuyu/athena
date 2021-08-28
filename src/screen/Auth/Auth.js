import React,{useState} from 'react'
import LogIn from '../../components/auth/login/LogIn'
import SignUp from '../../components/auth/signup/SignUp'
import './Auth.css'

export default function Auth() {

    const [state, setState] = useState({
        action:"log"
    })

    const toggleAction = () => {
        
        if(state.action === "log")
            setState({action:"sign"})
        else if (state.action === "sign")
            setState({action:"log"})

    }


    return (
        <div className="auth-container-main d-flex center-center">
            

            
           {
               state.action === 'log' ?
               <LogIn goSignUp={() => toggleAction()}/> : 
               <SignUp goLogin={() => toggleAction()}/>
           }
            
            
        </div>
    )
}
