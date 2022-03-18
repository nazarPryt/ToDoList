import React from 'react';
import {btnType} from "./App";

type ButtonsType = {
    filterTask: (value: btnType) => void
}

const Buttons = (props: ButtonsType) => {
    return (
        <div>
            <button onClick={ ()=>{props.filterTask('All')} }>All</button>
            <button onClick={ ()=>{props.filterTask("Completed")} }>Completed</button>
            <button onClick={ ()=>{props.filterTask("Active")} }>Active</button>
        </div>
    );
};

export default Buttons;