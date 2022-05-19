import React from 'react';
import s from './App.module.css'
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeToDoListTitleAC, filterType, removeToDoListAC} from "./store/todolistReducer";
import {addNewTaskAC, tasksDataType} from "./store/tasksReducer";
import EditableSpan from "./EditableSpan/EditableSpan";
import InputWithError from "./InputWithError";
import Task from "./Task";

type TodolistType = {
    todolistID: string
    title: string
    tasks: tasksDataType
    filter: filterType
}

function Todolist(props: TodolistType) {

    const dispatch = useDispatch()


    let filteredTasks = props.tasks[props.todolistID]

    switch (props.filter) {
        case "active":
            filteredTasks = filteredTasks.filter(task => !task.isDone)
            break;
        case "completed":
            filteredTasks = filteredTasks.filter(task => task.isDone)
            break;
    }

    return (
        <div>
            <div className={s.title}>
                <EditableSpan value={props.title}
                              newValue={value => dispatch(changeToDoListTitleAC(props.todolistID, value))}/>
                <button onClick={() => {
                    dispatch(removeToDoListAC(props.todolistID))
                }}>X
                </button>
            </div>
            <InputWithError value={value => dispatch(addNewTaskAC(props.todolistID, value))}/>
            <ul>
                {
                    filteredTasks.map(task => <Task key={task.id} task={task} todolistID={props.todolistID}/>)
                }
            </ul>
            <button onClick={() => dispatch(changeTodolistFilterAC(props.todolistID, 'all'))}>All</button>
            <button onClick={() => dispatch(changeTodolistFilterAC(props.todolistID, 'active'))}>Active</button>
            <button onClick={() => dispatch(changeTodolistFilterAC(props.todolistID, 'completed'))}>Completed</button>
        </div>
    );
}
export default Todolist;