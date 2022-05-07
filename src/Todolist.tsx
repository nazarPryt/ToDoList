import React from 'react';
import s from './App.module.css'
import {useDispatch} from "react-redux";
import {removeToDoListAC} from "./store/todolistReducer";
import {changeTaskStatusAC, tasksDataType} from "./store/tasksReducer";


type TodolistType = {
    todolistID: string
    title: string
    tasks: tasksDataType
}


function Todolist(props: TodolistType) {

    const dispatch = useDispatch()

    return (
        <div>

            <div className={s.title}>
                <h1>{props.title}</h1>
                <button onClick={() => {
                    dispatch(removeToDoListAC(props.todolistID))
                }}>X
                </button>
            </div>
            {/*<EditableSpan/>*/}
            <ul>
                {props.tasks[props.todolistID].map(li =>


                    <li key={li.id}>
                        <input type="checkbox"
                               checked={li.isDone}
                               onChange={()=>{dispatch(changeTaskStatusAC(props.todolistID, li.id))}}/>{li.subject}
                    </li>)}
            </ul>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};
export default Todolist;