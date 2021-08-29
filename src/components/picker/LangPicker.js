import React from 'react'

/**
 * 
 * @param {Dict} langList 
 * @returns 
 */
export default function LangPicker({langList,onSelect,name}) {

    const renderOptions = () => {
        return langList.map((item) => {
            console.log(item)
            return (
                <option value={item[0]}>
                    {item[1]}
                </option>
            )
        })
    }

    return (
        <select name="lang" id={`id_${name}`} className="lang-picker" onChange={(e) => onSelect(e.target.value)}>
            {renderOptions()}
        </select>
    )
}
