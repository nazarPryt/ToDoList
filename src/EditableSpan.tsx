import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: (newValue: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [newValue, setNewValue] = useState('')


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => setNewValue(e.currentTarget.value)
    const onClickHandler = () => {props.value(newValue)}
    return (
        <div>
            <input type="text" value={newValue} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

export default EditableSpan;