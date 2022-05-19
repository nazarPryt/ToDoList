import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    newValue: (newValue: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [status, setStatus] = useState<boolean>(true)
    const [newValue, setNewValue] = useState(props.value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
        props.newValue(newValue)
    }
    const onDoubleClickHandler = () => {
        setStatus(false)
    }
    const onBlurHandler = () => {
        setStatus(true)
    }

    return status
        ? <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>
        : <input
            type="text"
            value={newValue}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            autoFocus={true}
        />
}


export default EditableSpan