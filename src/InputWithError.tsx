import React, {ChangeEvent, useState} from 'react';
import s from "./App.module.css";

type InputWithErrorPropsType = {
    value: (value: string) => void
}

const InputWithError = (props: InputWithErrorPropsType) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onClickHandler = () => {
        (inputValue === '')
            ? setError(true)
            : props.value(inputValue)
        setInputValue('')

    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const onBlurHandler = () => {
        setError(false)
    }

    return <div>
        <input
            type="text"
            className={error ? s.error : ''}
            value={inputValue}
            onChange={onchangeHandler}
            onBlur={onBlurHandler}
        />
        <button onClick={onClickHandler}>+</button>
        {error && <div className={s.errorMessage}>Field is required !!!</div>}
    </div>

};

export default InputWithError;