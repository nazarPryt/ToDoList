import React from 'react';
import './App.module.css';
import Todolist from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {addNewTodolistAC, todolistDataType} from "./store/todolistReducer";
import {tasksDataType} from "./store/tasksReducer";
import s from './App.module.css'
import EditableSpan from "./EditableSpan";


function App() {
    const todolist = useSelector<RootReducerType, todolistDataType[]>(state => state.todolists)
    const tasks = useSelector<RootReducerType, tasksDataType>(state => state.tasks)
    const dispatch = useDispatch()

  return (
    <div >
        <div className={s.header}>
            <h1>Add New ToDoList:</h1>
            <EditableSpan value={(newValue)=>{dispatch(addNewTodolistAC(newValue))}}/>
        </div>
        <hr/><hr/><hr/>
        <div className={s.App}>
            {todolist.map(tl => <Todolist todolistID={tl.id} title={tl.title} key={tl.id} tasks={tasks}/>)}
        </div>

    </div>
  );
}

export default App;
