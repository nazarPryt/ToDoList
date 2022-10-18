import React, {useCallback} from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";

import InputForm from "./InputForm";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./Todolist/task-reducer";
import {
    changeFilterTaskAC,
    changeTitleToDoAC,
    deleteTodoListAC,
    FilterType,
    ToDoListDomainType
} from "./Todolist/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Todolist/store";
import {TaskStatuses, TaskType} from "./api/todoListAPI";


export type taskObjType = {
    [key: string]: Array<TaskType>
}

const App = React.memo(() => {

    const toDoLists = useSelector<rootReducerType, ToDoListDomainType[]>(state => state.toDoList)
    const taskObj = useSelector<rootReducerType, taskObjType>(state => state.task)
    const dispatch = useDispatch()


    const addTask = useCallback ((idTodo: string, value: string) => {
        // dispatch(addTaskAC(idTodo,value))
    }, [dispatch])
    const deleteTask = useCallback ((idTodo: string, idTask: string) => {
        dispatch(deleteTaskAC(idTodo,idTask))
    }, [dispatch])
    const changeTaskStatus = useCallback ((idTodo: string, idTask: string) => {
        dispatch(changeTaskStatusAC(idTodo,idTask))
    }, [dispatch])
    const changeFilter =useCallback ((idTodo: string, value: FilterType) => {
        dispatch(changeFilterTaskAC(idTodo,value))
    }, [dispatch])
    const deleteTodoList = useCallback ((idTodo: string) => {
        dispatch(deleteTodoListAC(idTodo))

    }, [dispatch])
    const addNewToDoList = useCallback ((inputValue: string) =>{
        // dispatch(addNewTodoListAC(inputValue))
    }, [])
    const changeTitleTask = useCallback ((idTodo: string, idTask: string, newValue: string) => {
        dispatch(changeTaskTitleAC(idTodo,idTask,newValue))
    }, [dispatch])
    const changeTitleToDo = useCallback( (idTodo: string, newValue: string) => {
        dispatch(changeTitleToDoAC(idTodo,newValue))
    }, [dispatch])



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
                if(tl.filter === 'active'){currentTask = currentTask.filter(el => el.status === TaskStatuses.New)}
                if(tl.filter === 'completed'){currentTask = currentTask.filter(el => el.status === TaskStatuses.Completed)}

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
})

export default App;
