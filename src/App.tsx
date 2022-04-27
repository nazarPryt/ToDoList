import React, {useState} from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";
import {v1} from "uuid";

import InputForm from "./InputForm";

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

    let [taskObj, setTaskObj] = useState<taskObjType>({
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

    let [toDoLists, setToDoLists] = useState<toDoListsType[]>([
        {id: taskID_1, title: "What to do", filter: 'all'},
        {id: taskID_2, title: "Something is done", filter: 'all'},
        {id: taskID_3, title: "Need to buy", filter: 'all'}
    ])
    const addTask = (idTodo: string, value: string) => {
        let newTask: TaskType = {id: v1(), isDone: true, subject: value}
        let newObj = [ newTask,...taskObj[idTodo]]
        taskObj[idTodo] = newObj
        setTaskObj({...taskObj})
    }
    const deleteTask = (idTodo: string, idTask: string) => {
        let restTasks = taskObj[idTodo].filter( el => el.id !== idTask)
        taskObj[idTodo] = restTasks
        setTaskObj({...taskObj})
    }

    const changeStatusTask = (idTodo: string, idTask: string) => {
        taskObj[idTodo].find( el => {
            if (el.id === idTask) {
                el.isDone = !el.isDone
            }
            return setTaskObj({...taskObj})
        })}

    const changeFilter =(idTodo: string, value: FilterType) => {
        toDoLists.find(el => {
            if (el.id === idTodo){
                el.filter = value
            }
            return setToDoLists([...toDoLists])
        })
    }
    const deleteTodoList = (idTodo: string) => {
        let restOfTodoLists = toDoLists.filter( el => el.id !==idTodo)
        setToDoLists([...restOfTodoLists])
        delete taskObj[idTodo]
    }
    const addItem = (inputValue: string) =>{
        let newTaskID = v1()
        let newTodoList: toDoListsType = {id: newTaskID,title: inputValue, filter: 'all'}
        setToDoLists([newTodoList, ...toDoLists])
        let newTodoListTask = taskObj[newTaskID] = []
        setTaskObj({newTodoListTask,...taskObj})
    }
    const changeTitleTask = (idTodo: string, idTask: string, newValue: string) => {
        let task = taskObj[idTodo].find(el => el.id === idTask)
        if (task){
            task.subject = newValue
            return setTaskObj({...taskObj})
        }
    }
    const changeTitleToDo = (idTodo: string, newValue: string) => {
        let todo = toDoLists.find(el => el.id === idTodo)
        if(todo){
            todo.title = newValue
            return setToDoLists([...toDoLists])
        }
    }



    return (
        <div className={s.app}>
            <div className={s.createTodoWrapper}>
                <h1>Create New To Do List</h1>
                <InputForm addItem={addItem}/>
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
                    changeStatusTask={changeStatusTask}
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
