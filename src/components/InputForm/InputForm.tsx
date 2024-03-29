import React, {ChangeEvent, useState} from 'react';
import s from "../../pages/Home/Home.module.css";


type inputFormType = {
    addItem: (inputValue: string) => void
    disabled?: boolean
}

const InputForm = React.memo((props: inputFormType) => {
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const onClickHandler = () => {
        if (inputValue !== '') {
            let str = `${inputValue.trim().toUpperCase()[0]}${inputValue.substring(1)}`
            props.addItem(str)
            setInputValue('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }

    return (
        <div>
            <input type="text" className={error ? s.error : ''} value={inputValue} onChange={onChangeHandler} disabled={props.disabled}/>
            <button onClick={onClickHandler} disabled={props.disabled}>+</button>
            {error && <div className={s.errorMessage}>Need to fill this line!!</div>}
        </div>
    );
})

export default InputForm;