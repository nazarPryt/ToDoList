import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    isDone: boolean
    subject: string
}
export type btnType = 'All' | 'Completed' | 'Active'
///////////////////////////////////////////////////////////////////

function App() {

    let [taskOne, setTask] = useState<Array<TaskType>>([
        {id: v1(), isDone: true, subject: "HTML&CSS"},
        {id: v1(), isDone: true, subject: "JS"},
        {id: v1(), isDone: true, subject: "React"},
        {id: v1(), isDone: false, subject: "Redux"}])
    function removeTask (id: string){
        let deletedTask = taskOne.filter( t => t.id !== id )
        setTask(deletedTask)
    }

    let [filter, setFilter] = useState<btnType>('All')


    let filteredTask = taskOne
    if (filter === 'Completed'){
        filteredTask = taskOne.filter( t =>t.isDone === true )

    }
    if (filter === 'Active'){
        filteredTask = taskOne.filter( t =>t.isDone === false )

    }
    function filterTask (value: btnType){
        setFilter(value)
    }

    function addTask (titleTask: string){
        let newTask: TaskType = {id: v1(), isDone: true, subject: titleTask}
        setTask([newTask, ...taskOne])
    }

    return (
        <div className="App">
            <ToDoList
                title={'What to learn'}
                task={filteredTask}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
            />
        </div>

    )}
export default App;
