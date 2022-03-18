import React from 'react';
import {TaskType} from "./App";

type BodyTodoType = {
    task: Array<TaskType>
    removeTask: (id: string) => void
}

const BodyTodo = (props: BodyTodoType) => {
    return (
        <div>
            <ul>
                {props.task.map( (t)=>{
                        return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.subject}</span>
                            <button onClick={ ()=>{props.removeTask(t.id)} }>X</button>
                        </li>
                        )})
                }
            </ul>
        </div>
    );
};

export default BodyTodo;