import React, {useState} from 'react';
import {todoListAPI} from "./todoListAPI";

const Test = () => {

    const [text, setText] = useState('')

    const res = todoListAPI.getTasks('86bfaaa4-7ac6-4ed3-8890-80fcbfd8412d')
    setText(res)

    return (
        <div>{JSON.parse(text)}</div>
    );
};

export default Test;