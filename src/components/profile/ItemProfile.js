import React from 'react'
import './ItemProfile.css'

export default function ItemProfile({data}) {
    return (
        <div className="profile-container d-flex shadow a-center">
            <div className="profile-photo d-flex center-center">
                <img src={data.image} alt="" />
            </div>

            <div className="profile-name">
                {data.name}
            </div>

            
        </div>
    )
}
