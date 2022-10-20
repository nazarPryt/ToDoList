import React, {useCallback, useEffect} from 'react';
import s from './App.module.css';
import Todolist from "./Todolist/Todolist";
import InputForm from "./InputForm";
import {deleteTaskAC} from "./Todolist/task-reducer";
import {
    addNewTodoListTC,
    changeFilterTaskAC,
    deleteTodoListAC,
    fetchToDoListsTC,
    FilterType,
    updateToDoListTC
} from "./Todolist/todolist-reducer";
import {useAppDispatch, useAppSelector} from "./Todolist/hooks";
import Test from "./api/test";



const App = React.memo(() => {

    const toDoLists = useAppSelector(state => state.toDoList)
    const taskObj = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchToDoListsTC()) //  ok
    },[dispatch])


    const addTask = useCallback((idTodo: string, value: string) => {
        // dispatch(addTaskAC(idTodo,value))
    }, [dispatch])
    const deleteTask = useCallback((idTodo: string, idTask: string) => {
        dispatch(deleteTaskAC(idTodo, idTask))
    }, [dispatch])
    const changeTaskStatus = useCallback((idTodo: string, idTask: string) => {
        // dispatch(changeTaskStatusAC(idTodo, idTask))
    }, [dispatch])
    const changeFilter = useCallback((idTodo: string, value: FilterType) => {
        dispatch(changeFilterTaskAC(idTodo, value))
    }, [dispatch])
    const deleteTodoList = useCallback((idTodo: string) => {
        dispatch(deleteTodoListAC(idTodo))

    }, [dispatch])
    const addNewToDoList = useCallback((inputValue: string) => {
        dispatch(addNewTodoListTC(inputValue))
    }, [])
    const changeTitleTask = useCallback((idTodo: string, idTask: string, newValue: string) => {
        // dispatch(changeTaskTitleAC(idTodo, idTask, newValue))
    }, [dispatch])
    const changeTitleToDo = useCallback((idTodo: string, newValue: string) => {
        dispatch(updateToDoListTC(idTodo, newValue))
    }, [dispatch])


    return (
        <div className={s.app}>
            <Test/>
            <div className={s.createTodoWrapper}>
                <h1>Create New To Do List</h1>
                <InputForm addItem={addNewToDoList}/>
            </div>
            <hr/>
            <hr/>
            <div className={s.contentWrapper}>

                {toDoLists.map(tl => {

                    // let currentTask = taskObj[tl.id]
                    // if (tl.filter === 'active') {
                    //     currentTask = currentTask.filter(el => el.status === TaskStatuses.New)
                    // }
                    // if (tl.filter === 'completed') {
                    //     currentTask = currentTask.filter(el => el.status === TaskStatuses.Completed)
                    // }

                    return <Todolist
                        key={tl.id}
                        idTodo={tl.id}
                        title={tl.title}
                        taskObj={taskObj}
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
