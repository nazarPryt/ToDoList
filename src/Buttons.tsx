import React from 'react';
import {filterValueType} from "./App";

type ButtonsType = {
    changeFilter: (value:filterValueType) => void
}

const Buttons = (props: ButtonsType) => {
    return (
        <div>
            <button onClick={ ()=>{props.changeFilter('All')} }>All</button>
            <button onClick={ ()=>{props.changeFilter('Active')} }>Active</button>
            <button onClick={ ()=>{props.changeFilter('Completed')}}>Completed</button>
        </div>
    );
};

export default Buttons;