import React from "react";
import HeaderToDoList from "./HeaderToDoList";

export type TaskType = {
    title: string
    id: number
    isDone: boolean
    subject: string
    btn: string
}
export type ToDoListType = {
    task: Array<TaskType>
}
const ToDoList = (props: ToDoListType) => {
    return <div>
        <HeaderToDoList title={props.task[0].title}/>
        <ul>
            <li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].subject}</span></li>
            <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].subject}</span></li>
            <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].subject}</span></li>
        </ul>
        <div>
            <button>{props.task[0].btn}</button>
            <button>{props.task[1].btn}</button>
            <button>{props.task[2].btn}</button>
        </div>
    </div>
}
export default ToDoList
