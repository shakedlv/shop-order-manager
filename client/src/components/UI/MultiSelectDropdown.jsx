import React, { useEffect, useState } from 'react'
import { Checkbox, Label } from 'flowbite-react';
function MultiSelectDropdown({ array, parameter, id, placeholder, onSelectEvent,initValue }) {
    const [selections, setSelections] = useState(initValue)


    const HandleSelect = (selected) => {
        if(selections.includes(selected))
        {
            setSelections((state) => state.filter((item) => item !== selected))
        }
        else
        {
            setSelections((prev)=>[...prev,selected])
        }

    }

    useEffect(() => {
        onSelectEvent(selections)

    }, [selections,onSelectEvent])
    
    return (
        <div id={id} className="max-w-md w-36 min-w-[128px] border border-neutral-300 rounded-md h-10 p-2 px-3 cursor-pointer "
            onClick={() => { document.getElementById("box").classList.toggle("hidden") }} >
                <div className=' overflow-hidden whitespace-nowrap'>{selections.length === 0 ? placeholder : selections.length === array.length ? placeholder : selections.map((s) => { return s +", " })}</div>

            <div className='relative max-w-full' onPointerLeave={() => { document.getElementById("box").classList.toggle("hidden") }}>
                <div className='absolute mt-2 w-fit shadow-lg rounded-b max-h-32 overflow-y-auto  z-10 bg-white border border-gray-400 rounded-md hidden' id="box">
                    {array ? array.map((a) => {
                        return <div key={a[parameter]}
                            className='cursor-pointer hover:bg-gray-300 p-2 w-full' >
                            <div className="flex items-center gap-2">
                                <Checkbox id={a[parameter]} value={selections.includes(a[parameter])}  onClick={()=>{HandleSelect(a[parameter])}}/>
                                <Label htmlFor={a[parameter]}>
                                    {a[parameter]}
                                </Label>
                            </div> </div>
                    }): <></>}
                </div>

            </div>

        </div>
    )
}

export default MultiSelectDropdown