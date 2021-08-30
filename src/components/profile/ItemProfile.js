import React from 'react'
import './ItemProfile.css'

export default function ItemProfile({data}) {
      
    
    return (
        <a className="profile-container d-flex shadow a-center"
            target="_blank"
            href={`http://torre.co/en/${data.username}`}>
            <div className="profile-photo d-flex center-center">
                <img src={data.image} alt="" />
            </div>

            <div className="profile-name">
                {data.name}
            </div>

            
        </a>
    )
}
