import React from "react";
import ToDoListHeader, {HeaderType} from "./ToDoListHeader";

export type TaskType = {
    title: string
    isDone: boolean
}

export type ToDoListType = {
    title?: string
    tasks: Array<TaskType>
    val?: HeaderType
}

function ToDoList (props: ToDoListType) {
    return (
        <div className="App">
                <ToDoListHeader val={"hed"} />
                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0]}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1]}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2]}</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>

        </div>
    )
}

export default ToDoList;