import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeValue: (value: string) => void
}

function EditableSpan (props: EditableSpanPropsType)  {
    let [spanStatus, setSpanStatus] = useState<boolean>(true)
    let [value, setValue] = useState<string>('')

    const editStatusHandler = () => {
        setSpanStatus(false)
        setValue(props.title)
    }
    const makeChangesHandler = () => {
        setSpanStatus(true)
        props.changeValue(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return spanStatus
        ? <span onDoubleClick={editStatusHandler}>{props.title}</span>
        : <input
            type="text"
            autoFocus={true}
            value={value}
            onBlur={makeChangesHandler}
            onChange={onChangeHandler}
        />


}

export default EditableSpan;