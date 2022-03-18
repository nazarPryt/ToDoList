import React from "react";
import Header from "./Header";
import Buttons from "./Buttons";
import BodyTodo from "./BodyTodo";
import {btnType, TaskType} from "./App";

type ToDoListType = {
    task: Array<TaskType>
    title: string
    removeTask: (id: string) => void
    filterTask: (value: btnType) => void
    addTask: (titleTask: string) => void
}

const ToDoList = (props: ToDoListType) => {
    return <div>
        <Header title={props.title} task={props.task} addTask={props.addTask}/>
        <BodyTodo removeTask={props.removeTask} task={props.task}/>
        <Buttons filterTask={props.filterTask}/>

    </div>
}
export default ToDoList;
