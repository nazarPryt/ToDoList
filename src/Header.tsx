import React, {useState} from 'react';
import {TaskType} from "./App";

type HeaderType = {
    title: string
    task: Array<TaskType>
    addTask: (titleTask: string) => void
}

const Header = (props: HeaderType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    return (
        <div>
            <h1>{props.title}</h1>
            <input type="text" value={newTaskTitle} onChange={ el =>{setNewTaskTitle(el.currentTarget.value)} }/>
            <button onClick={ ()=> {props.addTask(newTaskTitle); setNewTaskTitle('')} }>+</button>
        </div>
    );
};

export default Header;