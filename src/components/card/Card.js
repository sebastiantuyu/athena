import React,{useState} from 'react'
import './Card.css'
import Next from "../../assets/next.png"
import Match from "../../assets/match.png"
import Chinese from "../../assets/flags/chi.png"
import Deutsch from "../../assets/flags/deu.png"
import English from "../../assets/flags/eng.png"
import Spanish from "../../assets/flags/esp.png"
import French from "../../assets/flags/fra.png"
import Italian from "../../assets/flags/ita.png"
import Japanese from "../../assets/flags/jap.png"

import Empty from '../../assets/svgs/empty.svg'


/**
 * userData:
 *      interests: []
 *      langs: []
 *      image: string
 *      name: string
 *      description: string
 * 
 * @param userData Dictionary with userData
 * @param onSwipe Callback called after user swipe left/right
 * @returns Swipable card
 * @returns Left or Rigth constant after swipe
 */
export default function Card({userData,onSwipe,onNextUser}) {
    
    const MAX_SKILL_ALLOWED = 4

    const [state, setState] = useState({
        matched:null
    })

    const selectIcon = (lang) => {
        console.log(lang)
        switch(lang)
         {
             case 'es':
                 return Spanish
            case 'en':
                return English
            case 'fr':
                return French
            case 'it':
                return Italian
            case 'jap':
                return Japanese
            case 'deu':
                return Deutsch
            case 'chi':
                return Chinese
            default:
                return null
         }
    }

    const renderInterests = () => {
        if(userData.skills.length > 0)
            {
                return userData.skills.map((item,index) => {
                    if(index < MAX_SKILL_ALLOWED)
                    {
                        return (
                            <div className="interest-card-item shadow">
                                {item.name}
                            </div>
                        )
                    }
                })
            }
    }


    const renderLang = () => {
        return userData.langs.map((item) => {
            const icon = selectIcon(item.code)
            if(icon !== null)
                return( <div className="lang-item d-flex center-center shadow">
                        <img src={selectIcon(item.code)} alt="" />
                    </div>)
            else return null
        })
    }
   

    const swipe = () => {
        // Handles UI feedback when match
        setState({matched:true})
       
    }

    const next = () => {
        //Handles UI feecback when next
        setState({matched:false})
    }

    const setAnimation = () => {
        let base = "card-container shadow-lg d-flex f-column a-center"
        if(state.matched === true)
            return base + " matched" 
        else if (state.matched === false)
            return base + " next"
        else if (state.matched === null)
            return base
    }

    const callTo = () => {
        // Trigger callback on animation ends
        if(state.matched === true)
            {onSwipe()}
        else if (state.matched === false)
            {onNextUser()}
        
        setState({matched:null})
    }

    return (
        <div 
            className={setAnimation()}
            onAnimationEnd={() => callTo()}
            >
                { userData !== undefined ?
                    <>
                <div className="card-container-profile a-center">
                    <div class="card-photo d-flex center-center">
                    {
                        userData.image !== null ?
                        <img src={userData.image} alt=""/> : 
                        <img src={Empty} alt=""/>
                    }
                    </div>
                    
                    <div className="card-description">
                        <div className="c-d-name">{userData.name}</div>
                        <p className="c-d-content">
                            {
                            userData.description.length > 100 ?
                            userData.description.slice(0,100) + " ..." : 
                            userData.description
                            }
                        </p>
                    </div>
                    
                </div>

                <div className="card-container-skill d-flex w-100">
                    <div className="skill">
                        {renderInterests()}
                    </div>           

                    <div className="skill-lang">
                        {renderLang()}
                    </div>
                </div>

                <div className="card-buttons-bar d-flex a-center w-100">
                    <div className="btn btn-left d-flex center-center shadow"
                        onClick={() => next()}>
                        <img src={Next} alt="" />
                    </div>

                    <div className="btn btn-right d-flex center-center shadow"
                        onClick={() => swipe()}>
                        <img src={Match} alt="" />
                    </div>
                </div>
                    </> :
                    
                    <div className="any-coincidence shadow d-flex center-center">
                        ¡Ups, ya no hay mas coincidencias, añade o agrega otros intereses!
                    </div>

                }
        </div>
    )
}
