import React from 'react'
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

    const selectIcon = (lang) => {
        console.log(lang)
        switch(lang)
         {
             case 'es':
                 return Spanish
            case 'en':
                return English
            case 'fra':
                return French
            case 'ita':
                return Italian
            case 'jap':
                return Japanese
            case 'deu':
                return Deutsch
            case 'chi':
                return Chinese
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
            return( <div className="lang-item d-flex center-center shadow">
                        <img src={selectIcon(item.code)} alt="" />
                    </div>)
        })
    }
   
    return (
        <div className="card-container shadow-lg d-flex f-column a-center">
                <div className="card-container-profile a-center">
                    <div class="card-photo d-flex center-center">
                        <img src={userData.image} alt=""/>
                    </div>
                    
                    <div className="card-description">
                        <div className="c-d-name">{userData.name}</div>
                        <p className="c-d-content">{userData.description}</p>
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
                        onClick={() => onNextUser()}>
                        <img src={Next} alt="" />
                    </div>

                    <div className="btn btn-right d-flex center-center shadow"
                        onClick={() => onSwipe()}>
                        <img src={Match} alt="" />
                    </div>
                </div>
        </div>
    )
}
