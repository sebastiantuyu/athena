import React from 'react'
import LoaderImage from '../../assets/svgs/loader.svg'
import './Loader.css'

export default function Loader() {
    return (
        <div>
          <img src={LoaderImage} alt="" className="circle-loader"/>  
        </div>
    )
}
