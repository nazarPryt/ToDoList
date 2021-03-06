import React, {useCallback} from 'react';
import {FilterType, TaskType} from "../App";
import s from '../App.module.css'
import InputForm from "../InputForm";
import EditableSpan from "../EditableSpan";
import Task from "../Task";

type TodolistType = {
    idTodo: string
    title: string
    taskObj: TaskType[]
    addTask: (idTodo: string, value: string) => void
    deleteTask: (idTodo: string, idTask: string) => void
    changeStatusTask: (idTodo: string, idTask: string) => void
    changeTitleTask: (idTodo: string, idTask: string, newValue: string) => void
    changeTitleToDo: (idTodo: string, newValue: string) => void
    changeFilter: (idTodo: string, value: FilterType) => void
    filterValue: FilterType
    deleteTodoList: (idTodo: string) => void
}


const Todolist = React.memo((props: TodolistType) => {
    const deleteTodoListHandler = useCallback(() => {
        props.deleteTodoList(props.idTodo)
    },[props.deleteTodoList, props.idTodo])

    const allFilterHandler = () => {
        props.changeFilter(props.idTodo, 'all')
    }
    const activeFilterHandler = () => {
        props.changeFilter(props.idTodo, 'active')
    }
    const completedFilterHandler = () => {
        props.changeFilter(props.idTodo, 'completed')
    }

    const addItem = useCallback((inputValue: string) => {
        props.addTask(props.idTodo, inputValue)
    }, [])

    const changeInputValueHandler = useCallback((value: string) => {
        props.changeTitleToDo(props.idTodo, value)
    }, [props.changeTitleToDo])

    return (
        <div>
            <h1>
                <EditableSpan title={props.title} changeValue={changeInputValueHandler}/>
                <button onClick={deleteTodoListHandler}>X</button>
            </h1>

            <InputForm addItem={addItem}/>

            <ul>
                {props.taskObj.map(el => <Task
                    key={el.id}
                    task={el}
                    deleteTask={props.deleteTask}
                    idTodo={props.idTodo}
                    changeStatusTask={props.changeStatusTask}
                    changeTitleTask={props.changeTitleTask}
                />)}
            </ul>
            <button className={props.filterValue === 'all' ? s.active : ''} onClick={allFilterHandler}>All</button>
            <button className={props.filterValue === 'active' ? s.active : ''} onClick={activeFilterHandler}>Active
            </button>
            <button className={props.filterValue === 'completed' ? s.active : ''}
                    onClick={completedFilterHandler}>Completed
            </button>
        </div>
    )
})

export default Todolist;