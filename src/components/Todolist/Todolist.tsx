import React, {useCallback, useEffect} from 'react';
import s from '../../pages/Home/Home.module.css'
import InputForm from "../InputForm/InputForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {deleteTodoListTC, FilterType} from "./todolist-reducer";
import {useAppDispatch} from "../../store/hooks";
import {createNewTaskTC, setTasksTC, taskObjType} from "./task-reducer";
import Task from "../Task/Task";
import {TaskStatuses} from "../../api/todoListAPI";
import {RequestStatusType} from "./app-reducer";

type TodolistType = {
    EntityStatus: RequestStatusType
    idTodo: string
    title: string
    taskObj: taskObjType
    deleteTask: (idTodo: string, idTask: string) => void
    changeStatusTask: (idTodo: string, idTask: string, status: TaskStatuses) => void
    changeTitleTask: (idTodo: string, idTask: string, newValue: string) => void
    changeTitleToDo: (idTodo: string, newValue: string) => void
    changeFilter: (idTodo: string, value: FilterType) => void
    filterValue: FilterType
}

const Todolist = React.memo((props: TodolistType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.idTodo))   ///  ok
    }, [dispatch, props.idTodo])

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodoListTC(props.idTodo))
    }, [dispatch, props.idTodo])

    const allFilterHandler = () => {
        props.changeFilter(props.idTodo, 'all')
    }
    const activeFilterHandler = () => {
        props.changeFilter(props.idTodo, 'active')
    }
    const completedFilterHandler = () => {
        props.changeFilter(props.idTodo, 'completed')
    }

    const createNewTaskHandler = useCallback((inputValue: string) => {
        dispatch(createNewTaskTC(props.idTodo, inputValue))
    }, [dispatch, props.idTodo])

    const changeInputValueHandler = useCallback((value: string) => {
        props.changeTitleToDo(props.idTodo, value)
    }, [props.changeTitleToDo, props.idTodo])

    return (
        <div>
            <h1>
                <EditableSpan title={props.title} changeValue={changeInputValueHandler}/>
                <button onClick={deleteTodoListHandler} disabled={props.EntityStatus === 'loading'}>X</button>
            </h1>
            <InputForm addItem={createNewTaskHandler} disabled={props.EntityStatus === 'loading'}/>
            <ul>
                {props.taskObj[props.idTodo] &&
                    props.taskObj[props.idTodo].map(el =>
                        <Task
                            key={el.id}
                            task={el}
                            deleteTask={props.deleteTask}
                            idTodo={props.idTodo}
                            changeStatusTask={props.changeStatusTask}
                            changeTitleTask={props.changeTitleTask}
                        />
                    )}
            </ul>
            <button className={props.filterValue === 'all' ? s.active : ''} onClick={allFilterHandler}>All</button>
            <button className={props.filterValue === 'active' ? s.active : ''} onClick={activeFilterHandler}>Active
            </button>
            <button className={props.filterValue === 'completed' ? s.active : ''}
                    onClick={completedFilterHandler}>Completed
            </button>
        </div>
    )
})
export default Todolist;