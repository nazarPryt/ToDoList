import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

const taskOne = [
    {id: 1, title: 'What to learn', isDone: true, subject: "HTML&CSS", btn: 'All'},
    {id: 2, title: 'What to learn', isDone: true, subject: "JS", btn: 'Active'},
    {id: 3, title: 'What to learn', isDone: true, subject: "React", btn: 'Completed'}];
const taskTwo = [
    {id: 1, title: 'I would like to see', isDone: false, subject: "Terminator", btn: 'All'},
    {id: 2, title: 'I would like to see', isDone: false, subject: "Predator", btn: 'Chosen'},
    {id: 3, title: 'I would like to see', isDone: true, subject: "Matrix", btn: 'Done'}]

function App() {
    return (
        <div className="App">
            <ToDoList  task={taskOne} />
            <ToDoList  task={taskTwo} />
        </div>
    );
}

export default App;
