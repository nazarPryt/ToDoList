import React, {useCallback, useEffect} from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";
import InputForm from "./InputForm";
import {deleteTaskTC, updateTaskTC} from "./Todolist/task-reducer";
import {
    addNewTodoListTC,
    changeFilterTaskAC,
    fetchToDoListsTC,
    FilterType,
    updateToDoListTC
} from "./Todolist/todolist-reducer";
import {useAppDispatch, useAppSelector} from "./Todolist/hooks";
import {TaskStatuses, updateTaskModelType} from "./api/todoListAPI";
import LinearProgress from "@mui/material/LinearProgress";
import {Alert} from "@mui/material";
import {CustomizedSnackbars} from "./Todolist/ErrorSnackBar/ErrorSnackBar";
import Login from "./Login/Login";


const App = React.memo(() => {

    const toDoLists = useAppSelector(state => state.toDoList)
    const taskObj = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)


    useEffect(() => {
        dispatch(fetchToDoListsTC()) //  ok
    },[dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])
    const changeFilter = useCallback((idTodo: string, value: FilterType) => {
        dispatch(changeFilterTaskAC(idTodo, value))
    }, [dispatch])
    const addNewToDoList = useCallback((inputValue: string) => {
        dispatch(addNewTodoListTC(inputValue))
    }, [])
    const changeTitleTask = useCallback((todolistId: string, taskId: string, newValue: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newValue}))
    }, [dispatch])
    const changeTitleToDo = useCallback((idTodo: string, newValue: string) => {
        dispatch(updateToDoListTC(idTodo, newValue))
    }, [dispatch])

    return (
        // <div className={s.app}>
        //     <div className={s.createTodoWrapper}>
        //         <h1>Create New To Do List</h1>
        //         <InputForm addItem={addNewToDoList}/>
        //     </div>
        //     <hr/>
        //     <hr/>
        //     { status === "loading" && <LinearProgress />}
        //     <div className={s.contentWrapper}>
        //         {toDoLists.map(tl => {
        //             // let currentTask = taskObj[tl.id]
        //             // if (tl.filter === 'active') {
        //             //     currentTask = currentTask.filter(el => el.status === TaskStatuses.New)
        //             // }
        //             // if (tl.filter === 'completed') {
        //             //     currentTask = currentTask.filter(el => el.status === TaskStatuses.Completed)
        //             // }
        //             return <Todolist
        //                 key={tl.id}
        //                 EntityStatus={status}
        //                 idTodo={tl.id}
        //                 title={tl.title}
        //                 taskObj={taskObj}
        //                 deleteTask={deleteTask}
        //                 changeStatusTask={changeTaskStatus}
        //                 changeFilter={changeFilter}
        //                 filterValue={tl.filter}
        //                 changeTitleTask={changeTitleTask}
        //                 changeTitleToDo={changeTitleToDo}/>
        //         })}
        //     </div>
        //     {/*{ !!error && <Alert variant="filled" severity="error">{error}</Alert>}*/}
        //     <CustomizedSnackbars/>
        // </div>
<Login/>
    );
})

export default App;
