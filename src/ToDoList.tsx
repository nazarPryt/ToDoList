import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import s from './App.module.css'
import InputForm from "./InputForm";

type TodolistType = {
    idTodo: string
    title: string
    taskObj: TaskType[]
    addTask: (idTodo: string, value: string) => void
    deleteTask: (idTodo: string, idTask: string) => void
    changeStatusTask: (idTodo: string, idTask: string) => void
    changeFilter: (idTodo: string, value: FilterType) => void
    filterValue: FilterType
    deleteTodoList: (idTodo: string) => void
}


function Todolist(props: TodolistType) {

    const deleteTodoListHandler = ()=> {props.deleteTodoList(props.idTodo)}

    const allFilterHandler = () => {props.changeFilter(props.idTodo,'all')}
    const activeFilterHandler = () => {props.changeFilter(props.idTodo,'active')}
    const completedFilterHandler = () => {props.changeFilter(props.idTodo,'completed')}

    // const allClass = () => props.filterValue === 'all' ? s.active : '';
    // const activeClass = () => props.filterValue === 'active' ? s.active : '';
    // const completedClass = () => props.filterValue === 'completed' ? s.active : '';

    //need to check why it doesn't work inside in className

    const addItem = (inputValue: string) => {
        props.addTask(props.idTodo, inputValue)
    }
    return (
        <div>
            <h1>{props.title}<button onClick={deleteTodoListHandler}>X</button></h1>

            <InputForm addItem={addItem}/>

            <ul>
                {props.taskObj.map( el => {

                    const onClickHandler = () => {props.deleteTask(props.idTodo, el.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatusTask(props.idTodo, el.id)}

                    return <li><input type="checkbox" onChange={onChangeHandler} checked={el.isDone}/>{el.subject}<button onClick={onClickHandler}>X</button></li>
                })}
            </ul>
            <button className={props.filterValue === 'all' ? s.active : ''} onClick={allFilterHandler}>All</button>
            <button className={props.filterValue === 'active' ? s.active : ''} onClick={activeFilterHandler}>Active</button>
            <button className={props.filterValue === 'completed' ? s.active : ''} onClick={completedFilterHandler}>Completed</button>
        </div>
    )
}

export default Todolist;