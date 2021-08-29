import React from 'react'
import Logo from '../logo/Logo'
import Switch from '../switch/Switch'
import './Menu.css'
import Delete from '../../assets/svgs/delete.svg'
import ItemProfile from '../profile/ItemProfile'


export default function Menu() {
    
    const loadPreferences = () => {
        
        const preferences = ["Python","Django","UX/UI","Figma","LOL"]

        return preferences.map((item) => {
            return(
                <div className="preference-item d-flex a-center">
                    {item}
                    <img src={Delete} alt="" />
                </div>
            )
        })
    }
    
    const loadLang = () => {
        const preferences = ["esp","eng"]

        return preferences.map((item) => {
            return(
                <div className="preference-item d-flex a-center">
                    {item}
                    <img src={Delete} alt="" />
                </div>
            )
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
            <div className="logo-wrapper ">
                <Logo />
            </div>
            
            <div className="w-100 menu-settings">
                
                <div className="setting">
                    <span className="p-header">Preferencias</span>
                    <div className="preferences-container d-flex w-100">
                        {loadPreferences()}
                        {/* Add preference button */}
                        <div className="preference-item item-empty d-flex a-center">
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
                        <div className="preference-item item-empty d-flex a-center">
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
