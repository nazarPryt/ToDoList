import React from 'react';
import {TaskType} from "./App";

type HeaderType = {
    title: string
    task: Array<TaskType>
}

const Header = (props: HeaderType) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <input type="text"/>
            <button>+</button>
        </div>
    );
};

export default Header;