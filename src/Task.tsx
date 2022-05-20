import React from 'react';
import EditableSpan from "./EditableSpan";
import {TaskType} from "./App";


type TaskPropsType = {
    task: TaskType
    idTodo: string
    deleteTask: (idTodo: string, taskID: string) => void
    changeStatusTask: (idTodo: string, taskID: string) => void
    changeTitleTask: (idTodo: string, taskID: string, value: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => {props.deleteTask(props.idTodo, props.task.id)}
    const onChangeHandler = () => {props.changeStatusTask(props.idTodo, props.task.id)}
    const changeInputHandler = (value: string) => {
        props.changeTitleTask(props.idTodo, props.task.id, value)
    }


    return <li>
        <input type="checkbox" onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.subject} changeValue={changeInputHandler}/>
        <button onClick={onClickHandler}>X</button>
    </li>
});

export default Task;