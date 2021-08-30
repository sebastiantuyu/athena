import React from 'react'
import Delete from '../../assets/svgs/delete.svg'
import API from '../../res/API'

export default function PreferenceItem({data,target,onDelete}) {
    
    const executeDelete = async () => {
        let status = false
        if(target === "lang")
            { status = await API.langs.delete(data.id)}
        else if (target === "preference")
            { status = await API.preferences.delete(data.id)}
            if(status)
                onDelete(data.id)
    }
    
    return (

        <div className="preference-item d-flex a-center">
            {data.name}
            <img src={Delete} alt="" onClick={() => executeDelete()}/>
        </div>
    )
}
