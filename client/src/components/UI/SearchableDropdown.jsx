import React, { useState } from 'react'
import { Label, TextInput } from 'flowbite-react';

function SearchableDropdown({ array, parameter, id, label ,onSelectEvent}) {
    const [searchQuery, setSearchQuery] = useState("")
    var filteredArray = searchQuery.length > 0 ? array.filter((a) => a[parameter].toLowerCase().includes(searchQuery.toLowerCase())) : []
    
    
    const HandleSelect = (selected)=>
    {
        console.log(selected)
        onSelectEvent(selected)
        setSearchQuery(" ");
        document.getElementById("input").value = ""
        document.getElementById("input").placeholder = selected[parameter]
    }

    return (
        <div className="max-w-md flex-grow" >
            <div className="mb-2 block">
                <Label
                    htmlFor={id}
                    value={label}
                />
            </div>
            <div className='relative'>
                <TextInput
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    color="gray"
                    id="input"
                    placeholder="Search"
                    autoComplete='new-admin'
                />
                {filteredArray.length > 0 ? <div className='absolute mt-0.5 shadow-lg rounded-b max-h-32 overflow-y-auto w-full z-10 bg-white border border-gray-400 rounded-md'>
                    {filteredArray.map((a) => { return <div key={a[parameter]} onClick={()=>{HandleSelect(a)}}
                    className='cursor-pointer hover:bg-gray-300 p-2 w-full'> {a[parameter]}</div> })}
                </div> : <></>}

            </div>

        </div>
    )
}

export default SearchableDropdown