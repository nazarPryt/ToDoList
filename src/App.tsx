import React from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";

import InputForm from "./InputForm";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./Todolist/task-reducer";
import {addNewTodoListAC, changeFilterTaskAC, changeTitleToDoAC, deleteTodoListAC} from "./Todolist/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Todolist/store";

export type TaskType = {
    id: string
    isDone: boolean
    subject: string
}
export type FilterType = 'all' | 'completed' | 'active'
export type toDoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type taskObjType = {
    [key: string]: Array<TaskType>
}

function App() {

    const toDoLists = useSelector<rootReducerType, toDoListsType[]>(state => state.toDoList)
    const taskObj = useSelector<rootReducerType, taskObjType>(state => state.task)
    const dispatch = useDispatch()


    const addTask = (idTodo: string, value: string) => {
        dispatch(addTaskAC(idTodo,value))
    }
    const deleteTask = (idTodo: string, idTask: string) => {
        dispatch(deleteTaskAC(idTodo,idTask))
    }
    const changeTaskStatus = (idTodo: string, idTask: string) => {
        dispatch(changeTaskStatusAC(idTodo,idTask))
    }
    const changeFilter =(idTodo: string, value: FilterType) => {
        dispatch(changeFilterTaskAC(idTodo,value))
    }
    const deleteTodoList = (idTodo: string) => {
        dispatch(deleteTodoListAC(idTodo))

    }
    const addNewToDoList = (inputValue: string) =>{
        dispatch(addNewTodoListAC(inputValue))
    }
    const changeTitleTask = (idTodo: string, idTask: string, newValue: string) => {
        dispatch(changeTaskTitleAC(idTodo,idTask,newValue))
    }
    const changeTitleToDo = (idTodo: string, newValue: string) => {
        dispatch(changeTitleToDoAC(idTodo,newValue))
    }



    return (
        <div className={s.app}>
            <div className={s.createTodoWrapper}>
                <h1>Create New To Do List</h1>
                <InputForm addItem={addNewToDoList}/>
            </div>
            <hr/>
            <hr/>
            <div className={s.contentWrapper}>

            {toDoLists.map(tl => {

                let currentTask = taskObj[tl.id]
                if(tl.filter === 'active'){currentTask = currentTask.filter(el => el.isDone)}
                if(tl.filter === 'completed'){currentTask = currentTask.filter(el => !el.isDone)}

                return <Todolist
                    key={tl.id}
                    idTodo={tl.id}
                    title={tl.title}
                    taskObj={currentTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    changeStatusTask={changeTaskStatus}
                    changeFilter={changeFilter}
                    filterValue={tl.filter}
                    deleteTodoList={deleteTodoList}
                    changeTitleTask={changeTitleTask}
                    changeTitleToDo={changeTitleToDo}/>
            })}
            </div>
        </div>

    );
}

export default App;
