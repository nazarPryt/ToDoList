import React, {useReducer} from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";
import {v1} from "uuid";

import InputForm from "./InputForm";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./Todolist/task-reducer";
import {
    addNewTodoListAC,
    changeFilterTaskAC,
    changeTitleToDoAC,
    deleteTodoListAC,
    todolistReducer
} from "./Todolist/todolist-reducer";

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
    const taskID_1 = v1()
    const taskID_2 = v1()
    const taskID_3 = v1()

    let [taskObj, dispatchTasks] = useReducer(taskReducer,{
        [taskID_1]:
            [
                {id: v1(), isDone: true, subject: "HTML&CSS"},
                {id: v1(), isDone: true, subject: "JS"},
                {id: v1(), isDone: false, subject: "React"},
                {id: v1(), isDone: false, subject: "Redux"}
            ],
        [taskID_2]:
            [
                {id: v1(), isDone: true, subject: "Clean my house"},
                {id: v1(), isDone: true, subject: "Have a rest"}
            ],
        [taskID_3]:
            [
                {id: v1(), isDone: true, subject: "Butter"},
                {id: v1(), isDone: true, subject: "Milk"}
            ]
    })

    let [toDoLists, dispatchToDoList] = useReducer(todolistReducer,[
        {id: taskID_1, title: "What to do", filter: 'all'},
        {id: taskID_2, title: "Something is done", filter: 'all'},
        {id: taskID_3, title: "Need to buy", filter: 'all'}
    ])
    const addTask = (idTodo: string, value: string) => {
        dispatchTasks(addTaskAC(idTodo,value))
    }
    const deleteTask = (idTodo: string, idTask: string) => {
        dispatchTasks(deleteTaskAC(idTodo,idTask))
    }
    const changeTaskStatus = (idTodo: string, idTask: string) => {
        console.log('changetask status')
        dispatchTasks(changeTaskStatusAC(idTodo,idTask))
    }
    const changeFilter =(idTodo: string, value: FilterType) => {
       dispatchToDoList(changeFilterTaskAC(idTodo,value))
    }
    const deleteTodoList = (idTodo: string) => {
        const action = deleteTodoListAC(idTodo)
        dispatchTasks(action)
        dispatchToDoList(action)
    }
    const addNewToDoList = (inputValue: string) =>{
        const action = addNewTodoListAC(inputValue)
        dispatchTasks(action)
        dispatchToDoList(action)
    }
    const changeTitleTask = (idTodo: string, idTask: string, newValue: string) => {
        dispatchTasks(changeTaskTitleAC(idTodo,idTask,newValue))
    }
    const changeTitleToDo = (idTodo: string, newValue: string) => {
        dispatchToDoList(changeTitleToDoAC(idTodo,newValue))
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
