import React from 'react'
import LogoIcon from '../../assets/logo.png'
import './Logo.css'

export default function Logo() {
    return (
        <div className="logo-container-box">
            <img src={LogoIcon} alt="" className="logo-image-box" />
            <span className="logo-text-box">TorreMatch</span>
        </div>

    )
}
