import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {TaskType} from "./ToDoList";

function App() {
    const task1: Array<TaskType> = [
        { title: "What to learn", isDone: true},
        { title: "some another", isDone: true},
        { title: "third another", isDone: false}];
    const task2 = [
        { title: "HTML&CSS", isDone: false},
        { title: "JS", isDone: true},
        { title: "React", isDone: false}];

    return (
        <div>
            <ToDoList tasks={task1}   />
            <ToDoList tasks={task2}  />
        </div>
)}
export default App;
