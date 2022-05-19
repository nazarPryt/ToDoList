import React from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./store/tasksReducer";
import EditableSpan from "./EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch()
    return<li>
        <input type="checkbox"
               checked={props.task.isDone}
               onChange={() => {
                   dispatch(changeTaskStatusAC(props.todolistID, props.task.id))
               }}/>
        <EditableSpan
            value={props.task.subject}
            newValue={value => dispatch(changeTaskTitleAC(props.todolistID, props.task.id, value))}
        />
        <button onClick={() => dispatch(removeTaskAC(props.todolistID, props.task.id))}>X</button>
    </li>

};

export default Task;