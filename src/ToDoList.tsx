import React from "react";
import Header from "./Header";
import Buttons from "./Buttons";
import BodyTodo from "./BodyTodo";
import {filterValueType, TaskType} from "./App";

type ToDoListType = {
    task: Array<TaskType>
    title: string
    removeTask: (id: number)=> void
    changeFilter: (value: filterValueType)=> void
}

const ToDoList = (props: ToDoListType) => {
    return <div>
        <Header title={props.title} task={props.task}/>
        <BodyTodo removeTask={props.removeTask} task={props.task}/>
        <Buttons changeFilter={props.changeFilter}/>

    </div>
}
export default ToDoList;
