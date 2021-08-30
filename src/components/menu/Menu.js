import React,{useState,useEffect} from 'react'
import Logo from '../logo/Logo'
import './Menu.css'
import './Modal.css'
import Delete from '../../assets/svgs/delete.svg'
import ItemProfile from '../profile/ItemProfile'
import API from '../../res/API'
import LangPicker from '../picker/LangPicker'
import PreferenceItem from '../preference/PreferenceItem'


export default function Menu() {
    


    const [state, setState] = useState({
        show:false,
        points:'int',
        interests:[],
        langs:[],
        settingContent:"",
        localLangs:[],
        selectedLang:"",
    })

    const [setting, setSetting] = useState("")

    useEffect(() => {
        loadUserPreferences()
    }, state)

    const loadUserPreferences = async () => {

        const localLang = JSON.parse(await API.langs.getAll())
        const data = JSON.parse(await API.user.readPreferences(1))
        
        setState((prev) => ({...prev,
                                langs:data.languages,
                                interests:data.interests,
                                localLangs:localLang
                                }))       
    }


    const onSelectLang = (lang) => {
        setSetting(lang)
    }


    const onDeleteLang = (id) => {
        // Deletes the lang {id} of the list
        let list = state.langs.filter(item => item.id !== id)
        setState((prev) => ({...prev,langs:list}))
    }

    const onDeletePref = (id) => {
        // Deletes the interest {id} of the list
        let list = state.interests.filter(item => item.id !== id)
        setState((prev) => ({...prev,interests:list}))
    }

    const addSetting = async () => {
        tooggleModal()

        if(state.points === 'int')
        {   

            // Check if there some coincidences
            let check = state.interests.filter(item => item.name.replace(' ','').toLowerCase() === setting.replace(' ','').toLowerCase())
            console.log(check)
            if(check.length === 0){
                const [status,data] = await API.preferences.set(1,setting)
                if(status) {
                    let interest = state.interests
                    interest.push(JSON.parse(data))
                    setState((prev) => ({...prev,interests:interest}))
                }
            }
        }

        else if (state.points === 'lang'){

            let check = state.langs.filter(item => item.value === setting)
            if(check.length === 0){
                const [status,data] = await API.langs.set(1,setting,100)
                if(status) {
                    let lang = state.langs
                    lang.push(JSON.parse(data))
                    setState((prev) => ({...prev,langs:lang}))
                }
            } else {
                alert("Aviso: Ya tienes agregado ese elemento!")
            }
        }
    }

    const pickerSettings = () => {
        if(state.points === 'int'){
            return "interes"
        } else return "lenguaje"
    }

    const renderModal = (setting) => {
        
        if(state.show === true){
            return(
                <div className="modal-background d-flex center-center">
                    <div className="modal-container shadow-lg d-flex f-column a-center">
                        <div className="f-1 d-flex f-column modal-form">
                        <span className="modal-tit">
                            Agrega un nuevo {pickerSettings()}
                            </span>
                            {
                                pickerSettings() === 'lenguaje' ?
                
                                <LangPicker langList={state.localLangs} 
                                            name="lang"
                                            onSelect={onSelectLang}/> :
                
                                <input  type="text" 
                                placeholder={"Escribe aqui tu nuevo " + pickerSettings()}
                                className="m-input"
                                onChange={(e) => setSetting(e.target.value)}/>
                            }
                        </div>

                        <div className="m-btn-bar">
                            <div className="m-b cancel d-flex center-center" 
                                 onClick={() => tooggleModal()}>
                                Cancelar
                            </div>
                            <div className="m-b proceed d-flex center-center"
                                onClick={() => addSetting()}>
                                OK
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const tooggleModal = (who) => {
        if(state.show === true) setState((prev) => ({...prev,show:false})) 
        else setState((prev) => ({...prev,show:true,points:who}))
    }



    const loadPreferences = () => {       
        const preferences = state.interests
        
        return preferences.map((item) => {
            return(<PreferenceItem data={item} target="preference"
                    onDelete={(id) => onDeletePref(id)}/>)
        })
    }
    
    const loadLang = () => {
        const preferences = state.langs

        return preferences.map((item) => {
            return(<PreferenceItem data={item} target="lang"
                    onDelete={(id) => onDeleteLang(id)}/>)
        })
    }


    const loadSavedProfiles = () => {
        const saved = [
            {
                name:"Sebastian Tuyu",
                image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg",
            },
            {
                name:"Carlos Contreras",
                image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg"
            },
            {
                name:"Freddy Vega",
                image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg"
            },
            {
                name:"Christian Van",
                image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg"
            },
            {
                name:"Louis Von Han",
                image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg"
            }]

        return saved.map((item) => {
            return(
                <ItemProfile data={item}/>
            )
        })
    }

  
    return (
        <div className="menu-l-container shadow-lg">
            {renderModal()}
            <div className="logo-wrapper ">
                <Logo />
            </div>
            
            <div className="w-100 menu-settings">
                
                <div className="setting">
                    <span className="p-header">Preferencias</span>
                    <div className="preferences-container d-flex w-100">
                        {loadPreferences()}
                        {/* Add preference button */}
                        <div className="preference-item item-empty d-flex a-center" onClick={() => tooggleModal('int')}>
                            Añadir
                            <img src={Delete} alt="" className="add"/>
                        </div>

                    </div>
                </div>


                <div className="setting">
                    <span  className="p-header">
                        Lenguajes
                    </span>
                    <div className="lang-container d-flex w-100">
                        {loadLang()}
                        {/* Add preference button */}
                        <div className="preference-item item-empty d-flex a-center"  onClick={() => tooggleModal('lang')}>
                            Añadir
                            <img src={Delete} alt="" className="add"/>
                        </div>
                    </div>
                </div>


                <div className="setting">
                    <span className="p-header">
                        Saved profiles
                    </span>
                    <div className="w-100">
                        {loadSavedProfiles()}
                    </div>

                </div>
            </div>
        </div>
    )
}
