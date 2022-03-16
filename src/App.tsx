import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    isDone: boolean
    subject: string
}
export type filterValueType = 'All' | 'Completed' | 'Active'

function App() {

    let [taskOne, setTask] = useState([
        {id: 1, isDone: true, subject: "HTML&CSS"},
        {id: 2, isDone: true, subject: "JS"},
        {id: 3, isDone: false, subject: "React"},
        {id: 4, isDone: false, subject: "Redux"}])

    let [filter, setFilter] = useState<filterValueType> ('All')

    function removeTask (id: number) {
        let filteredTask = taskOne.filter( t => t.id !== id)
        setTask(filteredTask)
    }

    function changeFilter (value: filterValueType) {
        setFilter(value)
    }

    let taskForTodoList = taskOne;
    if (filter === 'Completed'){
        taskForTodoList = taskOne.filter( t => t.isDone)
    }
    if (filter === 'Active'){
        taskForTodoList = taskOne.filter( t => !t.isDone)
    }
    return (
        <div className="App">
            <ToDoList
                title={'What to learn'}
                task={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );}
export default App;
