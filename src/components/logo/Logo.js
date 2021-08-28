import React from 'react'
import LogoIcon from '../../assets/logo.png'
import './Logo.css'

export default function Logo({dark}) {
    return (
        <div className="logo-container-box d-flex j-start a-center">
            <img src={LogoIcon} alt="" className="logo-image-box" />
            <span 
                className={
                    dark === undefined ?
                    "logo-text-box" :
                    "logo-text-box dark"
                }>
                Torre Match
            </span> 
        </div>

    )
}
