import { Label, TextInput } from 'flowbite-react'
import React from 'react'

function InputGroup({id,label,placeholder,onChangeEvent,type}) {
    return (
        <div className='mb-2'>
            <div className="mb-2 block">
                <Label
                    htmlFor={id}
                    value={label}
                />
            </div>
            <TextInput
                onChange={(e) => { onChangeEvent(e) }}
                id={id}
                placeholder={placeholder}
                type={type}
                autoComplete="new-password"
            />
        </div>
    )
}

export default InputGroup